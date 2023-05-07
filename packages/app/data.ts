import * as fs from "fs/promises";
import * as path from "path";
import * as mime from "mime-types";
import { existsSync } from "fs";
import { eFileType, iFileItem } from "./interface";

export class IdAllocator {
  static instance: IdAllocator = null as any;

  private _current = 0;

  constructor() {
    if (IdAllocator.instance) return IdAllocator.instance;
    IdAllocator.instance = this;
    return this;
  }

  get() {
    this._current += 1;
    return this._current + "";
  }
}

export class FileItem implements iFileItem {
  id: string;
  name: string;
  parent: string;
  type: eFileType;
  mime: string;
  sequence: [string, string] = ["", ""];
  children: iFileItem[] = [];

  get path() {
    return path.join(this.parent, this.name);
  }

  static async create(parent: string, filename: string) {
    const filepath = path.join(parent, filename);
    try {
      const file_item = new FileItem();
      const stat = await fs.stat(filepath);
      file_item.id = new IdAllocator().get();
      file_item.name = path.basename(filepath);
      file_item.parent = parent;
      file_item.type = stat.isDirectory()
        ? eFileType.DIRECTORY
        : eFileType.FILE;
      file_item.mime = mime.lookup(filepath) || "";
      return file_item;
    } catch (e) {
      console.log("[ERROR] build file item failed ", e);
      return null;
    }
  }
}

function getIndexPath(dir: string) {
  return path.join(dir, `.browse.json`);
}

async function saveIndex(item: FileItem) {
  return fs.writeFile(
    getIndexPath(item.path),
    JSON.stringify(
      {
        ...item,
        children: item.children.map((child) => ({ ...child, children: [] })),
      },
      null,
      2
    )
  );
}

async function listFiles(item: FileItem) {
  let inside_directory = await fs.readdir(item.path);
  return inside_directory
    .sort((p, n) => p.localeCompare(n))
    .filter((n) => !n.startsWith("."));
}

export async function build_indexes_iteratively(
  parent: string,
  dir: string,
  max = 99
) {
  let candidates: Array<string[]> = [[parent, dir]];
  async function process_depth(candidate: string[]) {
    const item = await FileItem.create(candidate[0], candidate[1]);
    if (!item) return { item: null, new_candidates: [] };
    if (item.type == eFileType.DIRECTORY) {
      const files = await listFiles(item); // ignore hidden files
      item.children = await Promise.all(
        files.map((file) => FileItem.create(item.path, file))
      );
      await saveIndex(item);
      const new_candidates = item.children
        .filter((i) => i.type == eFileType.DIRECTORY)
        .map((i) => [i.parent, i.name]);
      return { item, new_candidates };
    }
    return { item, new_candidates: [] };
  }
  let item: FileItem;
  for await (const _ of Array.from({ length: max }).map((_, i) => i)) {
    let next_depth_candidate = [];
    for await (const candidate of candidates) {
      const result = await process_depth(candidate);
      next_depth_candidate = next_depth_candidate.concat(result.new_candidates);
      item = result.item;
    }
    if (next_depth_candidate.length == 0) break;
    candidates = next_depth_candidate;
  }
  return item;
}

async function getDirectoryItem(filepath: string) {
  const index_path = getIndexPath(filepath);

  try {
    if (existsSync(index_path)) {
      const parent_data = await fs.readFile(index_path);
      return JSON.parse(parent_data.toString()) as iFileItem;
    }
  } catch (e) {
    console.log("[ERROR] read index failed ", e.message);
  }
  return build_indexes_iteratively(
    path.dirname(filepath),
    path.basename(filepath)
  );
}

async function buildSequence(parent: iFileItem, file: iFileItem) {
  const index = parent.children.findIndex((i) => i.name == file.name);
  const is_first = index == 0;
  const is_last = index === parent.children.length - 1;
  const get_full = (file: iFileItem) => path.join(file.parent, file.name);
  if (!is_first && !is_last) {
    return [
      get_full(parent.children[index - 1]),
      get_full(parent.children[index + 1]),
    ];
  }

  const ancestor = await getItem(parent.parent);
  const parent_index = ancestor.children.findIndex(
    (i: iFileItem) => i.name == parent.name
  );
  const get_siblings = async (offset: number) => {
    let uncle = ancestor.children[parent_index + offset];
    if (!uncle) return ancestor.children[parent_index].children;
    const { children } = await getItem(path.join(uncle.parent, uncle.name));
    return children;
  };
  if (is_first) {
    const result = [get_full(file), get_full(parent.children[index + 1])];
    const siblings = await get_siblings(-1);
    if (siblings.length > 0) {
      result[0] = get_full(siblings[siblings.length - 1]);
    }
    return result;
  }
  const result = [get_full(parent.children[index - 1]), get_full(file)];
  const siblings = await get_siblings(1);
  if (siblings.length > 0) {
    result[1] = get_full(siblings[0]);
  }
  return result;
}

async function getItem(filepath: string) {
  try {
    const stat = await fs.stat(filepath);
    if (stat.isDirectory()) return getDirectoryItem(filepath);
    const dir = path.dirname(filepath);
    const parent_item = await getDirectoryItem(dir);
    const file_item = parent_item.children.find(
      (i) => i.name == path.basename(filepath)
    );
    const sequence = await buildSequence(parent_item, file_item);
    return { ...file_item, sequence };
  } catch (e) {
    console.log("[ERROR] get item failed ", e);
    return {
      name: path.basename(filepath),
      parent: path.dirname(filepath),
      type: eFileType.DIRECTORY,
      children: [],
      sequence: ["", ""] as [string, string],
      mime: "",
    };
  }
}

export default getItem;

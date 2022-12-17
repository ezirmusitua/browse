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

function get_index_path(dir: string) {
  return path.join(dir, `.browse.json`);
}

async function save_index(item: FileItem) {
  return fs.writeFile(
    get_index_path(item.path),
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

async function list_files(item: FileItem) {
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
      const files = await list_files(item); // ignore hidden files
      item.children = await Promise.all(
        files.map((file) => FileItem.create(item.path, file))
      );
      await save_index(item);
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

async function get_directory_item(filepath: string) {
  const index_path = get_index_path(filepath);

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

async function get_item(filepath: string) {
  try {
    const stat = await fs.stat(filepath);
    if (stat.isDirectory()) return get_directory_item(filepath);
    const dir = path.dirname(filepath);
    const parent_item = await get_directory_item(dir);
    const file_index = parent_item.children.findIndex(
      (i) => i.name == path.basename(filepath)
    );
    const file_item = parent_item.children[file_index];
    return {
      ...file_item,
      sequence: [
        path.join(
          dir,
          parent_item.children[file_index - 1]?.name || file_item.name
        ),
        path.join(
          dir,
          parent_item.children[file_index + 1]?.name || file_item.name
        ),
      ] as [string, string],
    };
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

export default get_item;

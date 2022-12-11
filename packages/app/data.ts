import * as path from "path";
import * as fs from "fs/promises";
import * as mime from "mime-types";
import { iFileItem } from "./interface";

const ID_START = 0;

interface iDirState {
  id: number;
  map: Record<string, iFileItem>;
}

async function build_file_item(
  id: string,
  filepath: string,
  root: string,
  sequence: [string, string]
) {
  const stat = await fs.stat(filepath);
  const name = path.basename(filepath);
  const dir = path.dirname(filepath).replace(root, "");
  return {
    id,
    name,
    dir,
    root,
    type: (stat.isDirectory() ? "directory" : "file") as any,
    mime: mime.lookup(filepath) || "",
    sequence,
    children: [],
  } as iFileItem;
}

async function build_directory_state(
  dir: string,
  root: string,
  state: iDirState
) {
  const name = path.basename(dir);
  if (name.startsWith(".")) return { state, item: null };
  const item = await build_file_item(state.id + "", dir, root, [
    Math.max(state.id - 1, ID_START) + "",
    state.id + 1 + "",
  ]);
  state.id += 1;
  if (item.type == "directory") {
    let inside_directory = await fs.readdir(dir);
    inside_directory = inside_directory
      .sort((p, n) => p.localeCompare(n))
      .map((name) => path.join(dir, name));
    const children: iFileItem[] = [];
    for await (const filepath of inside_directory) {
      const { item: child } = await build_directory_state(
        filepath,
        root,
        state
      );
      if (child) {
        children.push(child);
      }
    }
    item.children = children;
  }
  state.map[item.id] = { ...item };
  return { state, item };
}

export async function initialize_state(dir: string) {
  const cache_path = path.join(dir, ".browse");
  try {
    const cached = await fs.readFile(cache_path);
    const state = JSON.parse(cached.toString()) as iDirState;
    return { state };
  } catch (e) {
    const { state, item } = await build_directory_state(dir, dir, {
      id: ID_START,
      map: {} as Record<string, iFileItem>,
    });
    await fs.writeFile(cache_path, JSON.stringify(state));
    return { state, item };
  }
}

export async function get_state(dir: string) {
  const { state } = await initialize_state(dir);
  return state;
}

export default async function get_file_item(dir: string, id?: string) {
  const { state } = await initialize_state(dir);
  id = id || ID_START + "";
  return state.map[id];
}

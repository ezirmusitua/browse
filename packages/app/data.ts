import * as fs from "fs/promises";
import * as mimes from "mime-types";
import * as path from "path";
import { eFileType, iShallowFileItem } from "./interface";

async function buildFileItem(parent: string, filename: string) {
  const file_path = path.join(parent, filename);
  try {
    const stat = await fs.stat(file_path);
    const type = stat.isDirectory() ? eFileType.DIRECTORY : eFileType.FILE;
    const extension = path.extname(filename);
    const mime =
      (!stat.isDirectory() && extension && mimes.contentType(extension)) || "";
    return {
      parent,
      name: path.basename(file_path, stat.isDirectory() ? "" : extension),
      extension,
      path: file_path,
      type,
      mime,
      modified_at: stat.mtimeMs,
      created_at: stat.birthtimeMs,
      children: [],
    };
  } catch (e) {
    console.log("[ERROR] build file item failed ", e);
    return null;
  }
}

async function listFiles(item: iShallowFileItem) {
  let filenames = await fs.readdir(item.path);
  return Promise.all(
    filenames
      .sort((p, n) => p.localeCompare(n))
      .filter((name) => !name.startsWith("."))
      .map((name) => buildFileItem(item.path, name))
  );
}

export async function getDirectoryInfo(dir_path: string) {
  const parent = path.dirname(dir_path);
  const basename = path.basename(dir_path);
  const root = await buildFileItem(parent, basename);
  let children = [];
  if (root.type == eFileType.DIRECTORY) {
    children = await listFiles(root);
  }
  return { ...root, children };
}

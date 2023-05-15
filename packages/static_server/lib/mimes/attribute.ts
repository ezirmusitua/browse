import * as fs from "node:fs/promises";
import { iMimeServeFunc } from "./types";
import * as mimes from "mime-types";
import * as path from "path";

export enum eFileType {
  FILE = "file",
  DIRECTORY = "directory",
}

export interface iFileItem {
  name: string;
  parent: string;
  extension: string;
  path: string;
  type: eFileType;
  mime: string;
  modified_at: number;
  created_at: number;
  children?: iFileItem[];
}

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
    throw e;
  }
}

async function listFiles(item: iFileItem) {
  let filenames = await fs.readdir(item.path);
  return Promise.all(
    filenames
      .sort((p, n) => p.localeCompare(n))
      .filter((name) => !name.startsWith("."))
      .map((name) => buildFileItem(item.path, name))
  );
}

export async function buildAttributes(file_path: string) {
  const parent = path.dirname(file_path);
  const basename = path.basename(file_path);
  const root = await buildFileItem(parent, basename);
  let children: iFileItem[] = [];
  if (root.type == eFileType.DIRECTORY) {
    children = await listFiles(root);
  }
  return { ...root, children };
}

const serveAttributes: iMimeServeFunc = async (file_path, req, resp) => {
  const attributes = await buildAttributes(file_path);
  const buffer = Buffer.from(JSON.stringify(attributes, null, 2));
  resp.statusCode = 200;
  resp.setHeader("Content-Type", "application/json");
  resp.setHeader("Content-Length", buffer.length);
  resp.end(buffer);
  return resp;
};

export default serveAttributes;

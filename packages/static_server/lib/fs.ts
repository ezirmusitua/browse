import { existsSync } from "node:fs";
import * as fs from "node:fs/promises";
import { Config } from "./config";
import { getMime } from "./utils";

export async function detectFile(file: string) {
  const config = new Config();
  const base_dir = config.get("directory");
  if (!file.startsWith(base_dir)) {
    throw new Error(`服务器无法处理请求路径，请重新设置服务器可访问路径`);
  }
  if (!existsSync(file)) return undefined;
  const stat = await fs.stat(file);
  if (stat.isDirectory()) return { path: file, mime: "" };
  const mime_type = getMime(file);
  return { path: file, mime: mime_type };
}

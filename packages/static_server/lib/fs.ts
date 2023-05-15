import { existsSync } from "node:fs";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { Config } from "./config";
import { getMime } from "./utils";

export async function detectFile(file: string) {
  const config = new Config();
  const base_dir = config.get("directory");
  let fp = "";
  if (!file.startsWith("/")) {
    fp = path.join(base_dir, file);
  } else if (!file.startsWith(base_dir)) {
    throw new Error(`服务器无法处理请求路径，请重新设置服务器可访问路径`);
  } else {
    fp = file;
  }
  if (!existsSync(fp)) return undefined;
  const stat = await fs.stat(fp);
  if (stat.isDirectory()) return { path: fp, mime: "" };
  const mime_type = getMime(fp);
  return { path: fp, mime: mime_type };
}

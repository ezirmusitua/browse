import * as mime from "mime-types";
import { existsSync } from "node:fs";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { Config } from "./config";

const config = new Config();
export async function getFileMetadata(file: string) {
  let fp = "";
  if (!file.startsWith("/")) {
    fp = path.join(config.get("base"), file);
  } else if (!file.startsWith(config.get("base"))) {
    console.log(file, config.get("base"));
    throw new Error(`服务器无法处理请求路径，请重新设置服务器可访问路径`);
  } else {
    fp = file;
  }
  if (!existsSync(fp)) return undefined;
  const stat = await fs.stat(fp);
  if (stat.isDirectory()) {
    return { path: fp, mime: "" };
  }
  const mime_type = mime.contentType(path.extname(fp)) || "";
  return { path: fp, mime: mime_type };
}

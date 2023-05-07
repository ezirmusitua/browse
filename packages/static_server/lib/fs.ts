import * as mime from "mime-types";
import { existsSync } from "node:fs";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { Config } from "./config";

const config = new Config();
export async function getFileMetadata(file: string) {
  const fp = path.join(config.get("base"), file);
  if (!existsSync(fp)) return undefined;
  const stat = await fs.stat(fp);
  if (stat.isDirectory()) {
    return { path: fp, mime: "" };
  }
  const mime_type = mime.contentType(path.extname(fp)) || "";
  return { path: fp, mime: mime_type };
}

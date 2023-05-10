import * as fs from "node:fs/promises";
import { iMimeServeFunc } from "./types";

const serveMeta: iMimeServeFunc = async (path, req, resp) => {
  const stat = await fs.stat(path);
  resp.statusCode = 200;
  resp.setHeader("accept-ranges", "bytes");
  resp.setHeader("content-length", stat.size);
  resp.end();
  return resp;
};

export default serveMeta;

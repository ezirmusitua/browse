import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as mime from "mime-types";
import { pipeStream } from "../utils";
import { iMimeServeFunc } from "./types";

const serveOther: iMimeServeFunc = async (target, req, resp) => {
  const { size } = await fs.stat(target);
  const mime_type = mime.contentType(path.extname(target));
  if (!mime_type) {
    resp.setHeader(
      "Content-Disposition",
      "attachment; filename=" + path.basename(target)
    );
    resp.setHeader("Content-Type", "octet/octet-stream");
  } else {
    resp.setHeader("Content-Type", mime_type);
  }
  resp.setHeader("Content-Length", size);
  resp.statusCode = 200;
  return pipeStream(target, resp);
};

export default serveOther;

import * as fs from "node:fs/promises";
import * as path from "node:path";
import { getMime, pipeStream } from "../utils";
import { iMimeServeFunc } from "./types";

const serveOther: iMimeServeFunc = async (fp, req, resp) => {
  const { size } = await fs.stat(fp);
  const mime_type = getMime(fp);
  if (!mime_type) {
    resp.setHeader(
      "Content-Disposition",
      "attachment; filename=" + path.basename(fp)
    );
    resp.setHeader("Content-Type", "octet/octet-stream");
  } else {
    resp.setHeader("Content-Type", mime_type);
  }
  resp.setHeader("Content-Length", size);
  resp.statusCode = 200;
  return pipeStream(fp, resp);
};

export default serveOther;

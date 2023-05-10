import * as mime from "mime-types";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { pipeStream } from "../utils";
import { iMimeServeFunc } from "./types";

async function prepareResponse(filepath: string, range?: string) {
  const { size } = await fs.stat(filepath);
  const headers: Array<[string, any]> = [
    ["Content-Type", mime.contentType(path.extname(filepath))],
  ];
  if (range) {
    range = range.replace(/bytes=/gi, "");
    let [start, end] = range.split("-").map(Number);
    start = Number.isNaN(start) ? 0 : start;
    end = Number.isNaN(end) || !end ? size - 1 : end;
    const content_length = end - start + 1;
    headers.push(
      ["Content-Range", `bytes ${start}-${end}/${size}`],
      ["Accept-Ranges", "bytes"],
      ["Content-Length", content_length]
    );
    return { status: 206, headers, options: { start, end } };
  } else {
    headers.push(["Content-Length", size]);
    return { status: 200, headers, options: {} };
  }
}

const serveVideo: iMimeServeFunc = async (path, req, resp) => {
  const range = req.headers["range"];
  const { status, headers, options } = await prepareResponse(path, range);
  resp.statusCode = status;
  headers.forEach(([name, value]) => resp.setHeader(name, value));
  return pipeStream(path, resp, options);
};

export default serveVideo;

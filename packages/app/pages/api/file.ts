import * as path from "path";
import { createReadStream } from "fs";
import * as fs from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";
import * as mime from "mime-types";
import get_file_item from "../../data";

const CHUNK_SIZE = 10 ** 6; // 1MB

function pipe_stream(
  filepath: string,
  options: { start?: number; end?: number },
  res: NextApiResponse
) {
  const read_stream = createReadStream(filepath, options);
  read_stream.on("end", () => res.end());
  return read_stream.pipe(res);
}

async function prepare_range_materials(filepath: string, range_header: string) {
  const size = await fs.stat(filepath).then(({ size }) => size);
  // Parse range header, Example: "bytes=32324-"
  const start = Number(range_header.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, size - 1);
  // Create headers
  const content_length = end - start + 1;
  return {
    status: 206,
    headers: [
      ["Content-Range", `bytes ${start}-${end}/${size}`],
      ["Accept-Ranges", "bytes"],
      ["Content-Length", content_length],
      ["Content-Type", mime.contentType(path.extname(filepath))],
    ] as Array<[string, any]>,
    start,
    end,
  };
}

async function pipe_video(
  path: string,
  req: NextApiRequest,
  res: NextApiResponse
) {
  const range = req.headers.range;
  if (!range) return res.status(400).send("`Range` header is required");
  // Create headers
  const {
    status,
    headers: range_headers,
    start,
    end,
  } = await prepare_range_materials(path, range);
  res.status(status);
  range_headers.forEach(([name, value]) => res.setHeader(name, value));
  return pipe_stream(path, { start, end }, res);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "GET") return res.status(404).end("Method Not Allowed");
  const { dir, id } = req.query;
  console.log("[DEBUG] ", dir, id);
  const target = await get_file_item(dir + "", id + "");
  const filepath = path.join(target.root, target.dir, target.name);
  if (!target) return res.status(404).end("Not Found");
  if (target.mime.startsWith("image")) return pipe_stream(filepath, {}, res);
  if (target.mime.startsWith("video")) return pipe_video(filepath, req, res);
  return res.status(200).end(target.name);
}

import * as http from "node:http";
import { createReadStream } from "node:fs";

export function pipeStream<T extends NodeJS.WritableStream>(
  filepath: string,
  dest: T,
  options?: { start?: number; end?: number }
) {
  const read_stream = createReadStream(filepath, options);
  read_stream.on("end", () => dest.end());
  return read_stream.pipe(dest);
}

export function parseHumanSize(size: string) {
  if (!Number.isNaN(Number(size))) return Number(size);
  size = size.toLowerCase();
  if (size.endsWith("b")) {
    return Number(size.slice(0, -1));
  }
  if (size.endsWith("kb")) {
    return Number(size.slice(0, -2)) * 1024;
  }
  if (size.endsWith("mb")) {
    return Number(size.slice(0, -2)) * 1024 * 1024;
  }
  if (size.endsWith("gb")) {
    return Number(size.slice(0, -2)) * 1024 * 1024 * 1024;
  }
  throw new Error("Unknown size format");
}

export function parseQuery(req: http.IncomingMessage) {
  const query_string = (req.url || "").split("?").pop() || "";
  return query_string.split("&").reduce((acc: Record<string, any>, part) => {
    const [key, value] = part.split("=");
    return { ...acc, [key.trim()]: decodeURIComponent((value || "").trim()) };
  }, {});
}

export function NotFound(resp: http.ServerResponse, message = "Not Found") {
  resp.statusCode = 404;
  resp.end(message);
  return resp;
}

export function Success(
  resp: http.ServerResponse,
  data: string | Record<string, any>,
  code = 200
) {
  resp.statusCode = code;
  if (typeof data != "string") {
    resp.setHeader("Content-Type", "application/json");
    data = JSON.stringify(data, null, 2);
    resp.end(JSON.stringify(data, null, 2));
  } else {
    resp.end(data);
  }
  return resp;
}

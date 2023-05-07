import * as http from "node:http";

export function validateHttpMethod(
  req: http.IncomingMessage,
  resp: http.ServerResponse,
  allows = ["GET"]
) {
  const valid = allows.includes(req.method || "GET");
  if (!valid) {
    resp.statusCode = 404;
    resp.end("Method Not Allowed");
  }
  return valid;
}

import { getFileMetadata } from "./fs";
import { validateHttpMethod } from "./guards";
import serveImage from "./mimes/image";
import serveMeta from "./mimes/meta";
import serveOther from "./mimes/other";
import serveVideo from "./mimes/video";
import { iRouteHandler } from "./types";
import { NotFound, parseQuery } from "./utils";

export const serveHandler: iRouteHandler = async (req, resp) => {
  if (!validateHttpMethod(req, resp)) return;
  let query = parseQuery(req);
  const path = query.path || "";
  const meta = await getFileMetadata(path);
  if (!meta) return NotFound(resp);
  if (req.method === "HEAD") {
    return serveMeta(meta.path, req, resp);
  }
  if (meta.mime.startsWith("image/")) {
    return serveImage(meta.path, req, resp);
  }
  if (meta.mime.startsWith("video/")) {
    return serveVideo(meta.path, req, resp);
  }
  return serveOther(meta.path, req, resp);
};

const route: iRouteHandler = (req, resp) => {
  if ((req.url || "").startsWith("/")) {
    return serveHandler(req, resp);
  }
  return NotFound(
    resp,
    `${(req.method || "").toUpperCase()} ${req.url} Not Found`
  );
};

export default route;

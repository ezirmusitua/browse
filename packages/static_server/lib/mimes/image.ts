import { pipeStream } from "../utils";
import { iMimeServeFunc } from "./types";

const serveImage: iMimeServeFunc = (path, req, resp) => {
  return pipeStream(path, resp);
};

export default serveImage;

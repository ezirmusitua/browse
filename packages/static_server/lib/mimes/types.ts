import * as http from "node:http";
export interface iMimeServeFunc {
  (path: string, req: http.IncomingMessage, resp: http.ServerResponse):
    | http.ServerResponse
    | Promise<http.ServerResponse>;
}

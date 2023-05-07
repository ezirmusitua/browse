import * as http from "node:http";

export interface iRouteHandler {
  (req: http.IncomingMessage, resp: http.ServerResponse): any;
}

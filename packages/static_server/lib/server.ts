import * as http from "http";
import route from "./routes";
import { Config } from "./config";

export default function serve(host: string, port: string, directory: string) {
  host = host || process.env.HOST || "0.0.0.0";
  port = port || process.env.PORT || "8081";
  directory = directory || process.env.DIRECTORY || "./";
  new Config().init({ directory });
  const server = http.createServer((req, resp) => {
    resp.setHeader("Access-Control-Allow-Origin", "*");
    resp.setHeader("Access-Control-Allow-Methods", "OPTIONS, POST, GET");
    resp.setHeader("Access-Control-Max-Age", 2592000);
    return route(req, resp);
  });
  server.listen(Number(port), host, () => {
    console.info(`Serving ${directory}, listening ${host}:${port}`);
  });
}

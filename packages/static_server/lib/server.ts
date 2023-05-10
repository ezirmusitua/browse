import * as http from "http";
import route from "./routes";

export default function serve(host: string, port: string) {
  const server = http.createServer((req, resp) => {
    resp.setHeader("Access-Control-Allow-Origin", "*");
    resp.setHeader("Access-Control-Allow-Methods", "OPTIONS, POST, GET");
    resp.setHeader("Access-Control-Max-Age", 2592000);
    return route(req, resp);
  });
  server.listen(Number(port), host, () => {
    console.info(`listening ${host}:${port}`);
  });
}

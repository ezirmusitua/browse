import * as http from "http";
import route from "./routes";

export default function serve(host: string, port: string) {
  const server = http.createServer(route);
  server.listen(Number(port), host, () => {
    console.info(`listening ${host}:${port}`);
  });
}

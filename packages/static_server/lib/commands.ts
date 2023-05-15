import { Command } from "commander";
import serve from "./server";

const program = new Command();

program
  .command("serve")
  .description("Serve a static server")
  .option("-h, --hostname, [hostname]", "The listening hostname")
  .option("-p, --port [port]", "The listening port")
  .option("-d, --directory [path/to/serve]", "The directory to serve")
  .action((args) => {
    serve(args.hostname, args.port, args.directory);
  });

export default program;

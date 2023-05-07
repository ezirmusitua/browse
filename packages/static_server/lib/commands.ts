import { Command } from "commander";
import { Config } from "./config";
import serve from "./server";

const program = new Command();

program
  .command("serve")
  .description("Serve a static server")
  .option("-d, --directory <path/to/serve>", "The directory to serve", "")
  .option("-p, --port [port]", "The listening port", "8080")
  .option("-h, --hostname, [hostname]", "The listening hostname", "127.0.0.1")
  .action((args) => {
    new Config().init({ base: args.directory });
    serve(args.hostname, args.port);
  });

export default program;

import program from "./lib/commands";
import * as dotenv from "dotenv";
dotenv.config();

function main() {
  program.parse();
}

main();

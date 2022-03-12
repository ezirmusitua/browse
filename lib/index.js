const path = require("path");
const { prepare_content } = require("./content");
const { serve } = require('./server');
const { template } = require("./template")


function main() {
  const cwd = process.cwd()
  let target = process.argv[2] || "";
  if (!target.startsWith(path.sep)) {
    target = path.join(cwd, target);
  }
  const analysis = prepare_content(target);
  const port = parseInt(process.argv[3] || "8080")
  serve(template(analysis), port);
}

main()
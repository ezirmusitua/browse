const path = require("path");
const { analyze } = require("./analysis");
const { serve } = require('./server');
const { template } = require("./template")

function main() {
  const cwd = process.cwd()
  let target = process.argv[2] || "";
  if (!target.startsWith(path.sep)) {
    target = path.join(cwd, target);
  }
  const analysis = analyze(target);
  const port = parseInt(process.argv[3] || "8080")
  serve(analysis, template(analysis), port);
}

main()
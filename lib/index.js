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
  serve(analysis, template(analysis));
}

main()
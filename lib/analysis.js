const crypto = require("crypto")
const fs = require("fs");
const path = require("path")

function build_item(id, name, path, stat) {
  return {
    id,
    name,
    path,
    created_at: stat.ctimeMs,
    updated_at: stat.mtimeMs,
    size: stat.size,
  }

}

function analyze(target) {
  const name = path.basename(target);
  const result = {
    name,
    path: target, 
    nav: []
  };
  const stat = fs.statSync(target);
  if (stat.isDirectory()) {
    result.nav = fs.readdirSync(target).map((name, index) => {
      const stat = fs.statSync(path.join(target, name));
      return build_item(index, name, path.join(target, name), stat);
    }).sort((a, b) => a.name.localeCompare(b.name));
  } else {
    result.nav = [build_item(0, name, target, stat)];
  }
  return result;
}

module.exports = {
  analyze
}
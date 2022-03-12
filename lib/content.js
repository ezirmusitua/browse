const fs = require("fs");
const path = require("path")

const state = { id: 0, map: {} }

function build_item(id, name, path, stat) {
  return {
    id,
    name,
    path,
    created_at: stat.ctimeMs,
    updated_at: stat.mtimeMs,
    size: stat.size,
    is_directory: stat.isDirectory(),
  }
}

function walk(target) {
  const name = path.basename(target)
  if (name.startsWith(".")) return null;
  const stat = fs.statSync(target);
  const result = build_item(state.id, name, target, stat)
  if (result.is_directory) {
    result.id = `directory-${encodeURIComponent(name)}`
    result.children = fs.readdirSync(target).sort((p, n) => p.localeCompare(n)).map((name) => {
      const result = walk(path.join(target, name))
      return result;
    }).filter((r) => !!r);
  } else {
    state.map[state.id] = result;
    state.id += 1;
  }
  return result;
}

function prepare_content(target) {
  return walk(target)
}

module.exports = {
  prepare_content,
  state
}

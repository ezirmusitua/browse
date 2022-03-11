const fs = require('fs');
const http = require('http');

function serve(analysis, index_html) {
  const target_map = analysis.nav.reduce((res, item) => {
    res[item.id] = item;
    return res;
  }, {})
  return http.createServer((req, res) => {
    if (req.url === "/") {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(index_html);
    }
    if (req.url.startsWith("/target")) {
      const id = parseInt(req.url.split("/")[2], 10);
      const target = target_map[id]
      if (!target) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
      }
      fs.readFile(target.path, (_, data) => {
        res.writeHead(200);
        res.end(data);
      });
    }
  }).listen(8080)
}

module.exports = {
  serve
}
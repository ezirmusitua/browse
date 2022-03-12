const fs = require('fs');
const http = require('http');

function serve(analysis, index_html, port) {
  const target_map = analysis.nav.reduce((res, item) => {
    res[item.id] = item;
    return res;
  }, {})
  return http.createServer((req, res) => {
    if (req.url === "/") {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      return res.end(index_html);
    }
    // exit process 
    if (req.url.startsWith("/target")) {
      const id = parseInt(req.url.split("/")[2], 10);
      const target = target_map[id]
      if (!target) {
        res.writeHead(404);
        return res.end(JSON.stringify(err));
      }
      fs.readFile(target.path, (_, data) => {
        res.writeHead(200);
        return res.end(data);
      });
    }

    if (req.url === "/signal/close" && req.method === "POST") {
      process.exit(1)
    }
  }).listen(port)
}

module.exports = {
  serve
}
const fs = require('fs');
const http = require('http');
const { state } = require("./content");

function serve(index_html, port) {
  return http.createServer((req, res) => {
    if (req.url === "/") {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      return res.end(index_html);
    }
    // exit process 
    if (req.url.startsWith("/target")) {
      const id = parseInt(req.url.split("/")[2], 10);
      const target = state.map[id]
      if (!target) {
        res.writeHead(404);
        return res.end(JSON.stringify(err));
      }
      let data;
      const stat = fs.statSync(target.path);
      if (stat.isDirectory()) {
        data = target.name;
      } else {
        data = fs.readFileSync(target.path)
      }
      res.writeHead(200);
      return res.end(data);
    }

    if (req.url === "/signal/close" && req.method === "POST") {
      process.exit(0)
    }
  }).listen(port)
}

module.exports = {
  serve
}
const fs = require('fs');
const http = require('http');
const { state } = require("./content");

function serve(index_html, port) {
  return http.createServer((req, res) => {
    if (req.url === "/") {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      return res.end(index_html);
    }

    if (req.url.startsWith("/target")) {
      const id = parseInt(req.url.split("/")[2], 10);
      const target = state.map[id]
      if (!target) {
        res.writeHead(404);
        return res.end(JSON.stringify(err));
      }
      if (req.method === "DELETE") {
        // remove
        if (target.is_directory) {
          fs.rmdirSync(target.path)
        } else {
          fs.rmSync(target.path)
        }
        res.writeHead(200);
        res.end("success")
      } else {
        // serve file
        let data;
        if (target.is_directory) {
          data = target.name;
        } else {
          data = fs.readFileSync(target.path)
        }
        res.writeHead(200);
        return res.end(data);
      }
    }


    // exit process 
    if (req.url === "/signal/close" && req.method === "POST") {
      process.exit(0)
    }

  }).listen(port)
}

module.exports = {
  serve
}
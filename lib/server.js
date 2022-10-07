const fs = require("fs");
const http = require("http");
const { state } = require("./content");
const handle_video_request = require("./video_stream");

function serve(index_html, port) {
  return http
    .createServer((req, res) => {
      if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        return res.end(index_html);
      }

      if (req.url.startsWith("/target")) {
        const id = parseInt(req.url.split("/")[2], 10);
        const target = state.map[id];
        if (!target) {
          res.writeHead(404);
          return res.end(JSON.stringify(err));
        }
        if (req.method === "DELETE") {
          // remove
          if (target.is_directory) {
            fs.rmdirSync(target.path);
          } else {
            fs.rmSync(target.path);
          }
          res.writeHead(200);
          res.end("success");
          return;
        }
        console.log(target);
        // serve file
        if (target.src_type === "image") {
          rs = fs.createReadStream(target.path);
          res.writeHead(200);
          return rs.pipe(res);
        } else if (target.src_type === "video") {
          return handle_video_request(target.path, req, res);
        } else {
          return res.writeHead(200).end(target.name)
        }
      }

      // exit process
      if (req.url === "/signal/close" && req.method === "POST") {
        process.exit(0);
      }
    })
    .listen(port);
}

module.exports = {
  serve,
};


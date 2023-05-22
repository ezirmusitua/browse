// eslint-disable
const { createServer } = require("node:http");
const { parse } = require("url");
const next = require("next");
const next_config = require("./next.config");
const fs = require("node:fs");
const path = require("node:path");
const dotenv = require("dotenv");

dotenv.config();

const dev = (process.env.NODE_ENV || "development") == "development";
const hostname = process.env.HOST || "0.0.0.0";
const port = parseInt(process.env.PORT || "8080");
// when using middleware `hostname` and `port` must be provided below

const app = next({ dev, hostname, port, conf: next_config, dir: __dirname });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;
      if (pathname === "/a") {
        await app.render(req, res, "/a", query);
      } else if (pathname === "/b") {
        await app.render(req, res, "/b", query);
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.log("[ERROR] Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`[INFO] > Ready on http://${hostname}:${port}`);
  });
});

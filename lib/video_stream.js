const fs = require("fs");

function handle_video_request(path, req, res) {
  const range = req.headers.range;
  if (!range) {
    res.writeHead(400).send("Requires Range header");
    return;
  }

  // get video stats (about 61MB)
  const videoPath = path;
  const videoSize = fs.statSync(path).size;

  // Parse Range
  // Example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);
  videoStream.on("end", () => res.end());
}

module.exports = handle_video_request;

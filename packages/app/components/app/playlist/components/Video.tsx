interface iProps {
  src: string;
  mime: string;
}

function VideoViewer({ src, mime }: iProps) {
  if (!mime.startsWith("video")) return null;
  return (
    <video
      className="max-h-full"
      style={{ width: "calc(100vw - 228px)" }}
      src={src}
      autoPlay
      controls
    ></video>
  );
}

export default VideoViewer;

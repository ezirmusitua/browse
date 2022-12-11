import { useContext } from "react";
import Loading, { LoadingContext } from "./Loading";

interface iProps {
  src: string;
  mime: string;
}

function VideoViewer({ src, mime }: iProps) {
  const { hide: hide_loading } = useContext<{ hide: any }>(LoadingContext);
  if (!mime.startsWith("video")) return null;
  return (
    <div className="relative w-full h-full flex items-center">
      <video
        className="max-h-full w-full"
        src={src}
        onLoadedMetadata={hide_loading}
        autoPlay
        controls
      ></video>
      <Loading></Loading>
    </div>
  );
}

export default VideoViewer;

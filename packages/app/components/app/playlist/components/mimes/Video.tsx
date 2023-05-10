import { useContext } from "react";
import Loading, { LoadingContext } from "../Loading";
import { iMimeBaseProps } from "./interface";

function VideoViewer({ src, mime }: iMimeBaseProps) {
  const { hide: hideLoading } = useContext<{ hide: any }>(LoadingContext);
  if (!mime.startsWith("video")) return null;
  return (
    <div className="relative w-full h-full flex items-center">
      <video
        className="max-h-full w-full"
        src={src}
        onLoadedMetadata={hideLoading}
        autoPlay
        controls
      ></video>
      <Loading></Loading>
    </div>
  );
}

export default VideoViewer;

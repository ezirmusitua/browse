import Loading from "../Loading";
import { WithLoading } from "./components/Loading";
import ImageViewer from "./components/mimes/Image";
import CodeViewer from "./components/mimes/Text";
import VideoViewer from "./components/mimes/Video";
import { usePlaylistPreview } from "./service";

function Playlist() {
  const { mime, src } = usePlaylistPreview();
  if (!src) {
    return (
      <div className="w-full h-screen">
        <Loading></Loading>
      </div>
    );
  }
  return (
    <WithLoading>
      <div className="p-4 w-full h-screen flex items-center justify-center">
        <ImageViewer src={src} mime={mime}></ImageViewer>
        <VideoViewer src={src} mime={mime}></VideoViewer>
        <CodeViewer src={src} mime={mime}></CodeViewer>
      </div>
    </WithLoading>
  );
}

export default Playlist;

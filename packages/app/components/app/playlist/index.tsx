"use client";

import { iFileItem } from "../../../interface";
import { usePlaylist } from "./service";
import ImageViewer from "./components/Image";
import VideoViewer from "./components/Video";
import { WithLoading } from "./components/Loading";

function Playlist({ current }: { current: iFileItem }) {
  const { mime, src } = usePlaylist(current);
  return (
    <WithLoading>
      <div className="p-4 w-full h-screen flex items-center justify-center">
        <ImageViewer src={src} mime={mime}></ImageViewer>
        <VideoViewer src={src} mime={mime}></VideoViewer>
      </div>
    </WithLoading>
  );
}

export default Playlist;

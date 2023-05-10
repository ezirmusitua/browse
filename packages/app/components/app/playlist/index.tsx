"use client";

import { iFileItem } from "../../../interface";
import { usePlaylist } from "./service";
import ImageViewer from "./components/mimes/Image";
import VideoViewer from "./components/mimes/Video";
import { WithLoading } from "./components/Loading";
import CodeViewer from "./components/mimes/CodeContent";

function Playlist({ dir, current }: { dir: string; current: iFileItem }) {
  const { mime, src } = usePlaylist(dir, current);
  console.log("[DEBUG] playlist ", mime, src);
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

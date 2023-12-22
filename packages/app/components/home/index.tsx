import { useMemo } from "react";
import { useRouterQuery } from "../../utils";
import Loading from "../Loading";
import { WithLoading } from "./components/Loading";
import ImageViewer from "./components/mimes/Image";
import CodeViewer from "./components/mimes/Text";
import VideoViewer from "./components/mimes/Video";
import { useFileInfo } from "./service";

export const usePreview = () => {
  const { path } = useRouterQuery(["path"]);
  const { file: current } = useFileInfo(path);
  const mime = useMemo(() => current?.mime, [current?.mime]);
  const src = useMemo(
    () =>
      current
        ? `${process.env.NEXT_PUBLIC_ASSET_BASE}/?path=${encodeURIComponent(
            current.path
          )}`
        : undefined,
    [current]
  );

  return { src, mime };
};

function Home() {
  const { mime, src } = usePreview();
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

export default Home;

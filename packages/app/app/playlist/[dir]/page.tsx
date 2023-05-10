import Playlist from "../../../components/app/playlist";
import Actions from "../../../components/app/playlist/components/Actions";
import { getJson } from "../../../fetch";

interface iProps {
  params: { dir: string };
  searchParams: { path?: string };
}

async function getFileData(path: string) {
  return getJson("/api/file_info", null, { path });
}

async function PlaylistPage({
  params: { dir },
  searchParams: { path },
}: iProps) {
  const _dir = decodeURIComponent(dir);
  console.log("[DEBUG] playlist page ", _dir, path);
  const current = await getFileData(path || _dir);
  console.log("[DEBUG] file data ", _dir, current);
  return (
    <>
      <Playlist dir={_dir} current={current}></Playlist>
      <Actions></Actions>
    </>
  );
}

export default PlaylistPage;

import Playlist from "../../../components/app/playlist";
import Actions from "../../../components/app/playlist/components/Actions";
import { getJson } from "../../../fetch";

interface iProps {
  params: { dir: string };
  searchParams: { path?: string };
}

async function getFileIata(path: string) {
  return getJson("/api/file_info", null, { path });
}

async function PlaylistPage({
  params: { dir },
  searchParams: { path },
}: iProps) {
  const _dir = decodeURIComponent(dir);
  const current = await getFileIata(path || _dir);
  return (
    <>
      <Playlist dir={_dir} current={current}></Playlist>
      <Actions></Actions>
    </>
  );
}

export default PlaylistPage;

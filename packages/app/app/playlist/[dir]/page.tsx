import Playlist from "../../../components/app/playlist";
import Actions from "../../../components/app/playlist/components/Actions";

interface iProps {
  params: { dir: string };
  searchParams: { path?: string };
}

async function get_file_data(path: string) {
  let url = `http://127.0.0.1:8080/api/file_info?path=${encodeURIComponent(
    path
  )}`;
  const resp = await fetch(url);
  return resp.json();
}

async function PlaylistPage({
  params: { dir },
  searchParams: { path },
}: iProps) {
  const _dir = decodeURIComponent(dir);
  const current = await get_file_data(path || _dir);
  return (
    <>
      <Playlist dir={_dir} current={current}></Playlist>
      <Actions></Actions>
    </>
  );
}

export default PlaylistPage;

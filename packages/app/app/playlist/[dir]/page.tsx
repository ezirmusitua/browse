import Playlist from "../../../components/app/playlist";
import Actions from "../../../components/app/playlist/components/Actions";

interface iProps {
  params: { dir: string };
  searchParams: { path?: string };
}

async function get_file_data(path: string) {
  let url = `http://127.0.0.1:8080/api/file_info?path=${path}`;
  const resp = await fetch(url);
  return resp.json();
}

async function PlaylistPage({
  params: { dir },
  searchParams: { path },
}: iProps) {
  const current = await get_file_data(path || dir);
  return (
    <>
      <Playlist dir={decodeURIComponent(dir)} current={current}></Playlist>
      <Actions></Actions>
    </>
  );
}

export default PlaylistPage;

import Playlist from "../../../components/app/playlist";
import Actions from "../../../components/app/playlist/components/Actions";

interface iProps {
  params: { dir: string };
  searchParams: { id?: string };
}

async function get_file_data(dir: string, id?: string) {
  let url = `http://127.0.0.1:8080/api/file_info?dir=${dir}`;
  url += id ? `&id=${id}` : "";
  const resp = await fetch(url);
  return resp.json();
}

async function PlaylistPage({ params: { dir }, searchParams: { id } }: iProps) {
  const current = await get_file_data(dir, id || "");
  return (
    <>
      <Playlist current={current}></Playlist>
      <Actions></Actions>
    </>
  );
}

export default PlaylistPage;

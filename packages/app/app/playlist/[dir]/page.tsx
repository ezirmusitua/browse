import Playlist from "../../../components/app/playlist";

interface iProps {
  params: { dir: string };
  searchParams: { id?: string };
}

async function get_file_data(dir: string, id?: string) {
  let url = `http://localhost:8080/api/file_info?dir=${dir}`;
  url += id ? `&id=${id}` : "";
  const resp = await fetch(url);
  return resp.json();
}

async function PlaylistPage({ params: { dir }, searchParams: { id } }: iProps) {
  const current = await get_file_data(dir, id || "");
  return <Playlist current={current}></Playlist>;
}

export default PlaylistPage;

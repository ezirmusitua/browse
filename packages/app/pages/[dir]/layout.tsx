import { MountStorage } from "../../../components/app/playlist/components/MountStorage";
import { getJson } from "../../../fetch";

async function loadRoot(path: string) {
  return getJson(`/api/file_info`, null, { path });
}

export default PlaylistLayout;

import Layout from "../../components/Layout";
import Playlist from "../../components/[dir]";
import Actions from "../../components/[dir]/components/Actions";
import { usePlaylist } from "../../components/[dir]/service";

function PlaylistPage() {
  const { root, initialized } = usePlaylist();
  if (!initialized) return null;
  return (
    <Layout root={root}>
      <Playlist></Playlist>
      <Actions></Actions>
    </Layout>
  );
}

export default PlaylistPage;

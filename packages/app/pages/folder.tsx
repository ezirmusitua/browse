import Home from "../components/home";
import Actions from "../components/home/components/Actions";
import { useFolder } from "../components/home/service";
import Layout from "../components/Layout";
import SettingsModal from "../components/Settings";

function HomePage() {
  const { root_dir, stage } = useFolder();
  if (stage == "not-initialized") {
    return <SettingsModal></SettingsModal>;
  }
  if (stage != "initialized") return null;
  return (
    <Layout root={root_dir}>
      <Home></Home>
      <Actions></Actions>
    </Layout>
  );
}

export default HomePage;

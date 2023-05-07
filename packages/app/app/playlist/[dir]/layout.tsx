import Sider from "../../../components/Layout/Sider";
import { getJson } from "../../../fetch";

async function loadRoot(path: string) {
  return getJson(`/api/file_info`, null, { path });
}

async function PlaylistLayout({
  children,
  params: { dir },
}: {
  children: React.ReactNode;
  params: { dir: string };
}) {
  const root = await loadRoot(decodeURIComponent(dir));
  if (!root) return <div>Something went wrong!</div>;
  return (
    <div className="min-h-screen overflow auto">
      <Sider dir={dir} title={root.name} items={root.children}></Sider>
      <main
        id="main"
        className="w-full h-full pl-[240px] bg-gray-800 transition-all duration-50"
      >
        {children}
      </main>
    </div>
  );
}

export default PlaylistLayout;

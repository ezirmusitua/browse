import Sider from "../../../components/Layout/Sider";

async function load_root(dir: string) {
  const resp = await fetch(`http://localhost:8080/api/file_info?dir=${dir}`);
  return resp.json();
}

async function PlaylistLayout({
  children,
  params: { dir },
}: {
  children: React.ReactNode;
  params: { dir: string; id: string };
}) {
  const root = await load_root(dir);
  return (
    <div className="min-h-screen overflow auto">
      <Sider title={root.name} items={root.children}></Sider>
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

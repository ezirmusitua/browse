import Sider from "../../../components/Layout/Sider";

async function load_root(path: string) {
  try {
    const resp = await fetch(
      `http://127.0.0.1:8080/api/file_info?path=${path}`
    );
    return resp.json();
  } catch (e) {
    console.log("[ERROR] load root failed ", e);
  }
}

async function PlaylistLayout({
  children,
  params: { dir },
}: {
  children: React.ReactNode;
  params: { dir: string };
}) {
  const root = await load_root(dir);
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

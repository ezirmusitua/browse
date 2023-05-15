import { iFileItem } from "../../interface";
import Loading from "../Loading";
import Sider from "./Sider";

interface iProps {
  root: iFileItem;
  children: React.ReactNode;
}

function Layout({ root, children }: iProps) {
  if (!root) return <Loading></Loading>;
  return (
    <div className="min-h-screen overflow-auto">
      <Sider
        dir={root.path}
        title={root.name}
        items={root.children || []}
      ></Sider>
      <main
        id="main"
        className="w-full h-full pl-[240px] bg-gray-800 transition-all duration-50"
      >
        {children}
      </main>
    </div>
  );
}

export default Layout;

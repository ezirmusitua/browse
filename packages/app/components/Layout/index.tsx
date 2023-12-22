import { iFileItem } from "../../interface";
import Loading from "../Loading";
import Sider, { SIDE_WIDTH } from "./Sider";

interface iProps {
  root: iFileItem;
  children: React.ReactNode;
}

function Layout({ root, children }: iProps) {
  if (!root) return <Loading></Loading>;
  return (
    <div className="min-h-screen overflow-auto">
      <Sider title={root.name} items={root.children || []}></Sider>
      <main
        id="main"
        className="w-full h-full bg-gray-800 transition-all duration-50"
        style={{ paddingLeft: SIDE_WIDTH }}
      >
        {children}
      </main>
    </div>
  );
}

export default Layout;

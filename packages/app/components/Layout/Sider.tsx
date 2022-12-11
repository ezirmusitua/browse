import { iFileItem } from "../../interface";
import { DirectorItem, FileItem } from "./NavItem";
import Title from "./Title";

function Sider({ title, items }: { title: string; items: Array<iFileItem> }) {
  return (
    <nav
      id="sider"
      className="z-50 fixed top-0 left-0 h-screen w-[240px] overflow-auto bg-gray-900 shadow-md transition-all duration-50"
    >
      <Title title={title}></Title>
      <ul className="text-[12px] pl-1 pt-[48px]">
        {items.map((item, key) =>
          item.type == "directory" ? (
            <DirectorItem key={key} item={item}></DirectorItem>
          ) : (
            <FileItem key={key} item={item}></FileItem>
          )
        )}
      </ul>
    </nav>
  );
}

export default Sider;

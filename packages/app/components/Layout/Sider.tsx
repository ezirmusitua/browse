import { iFileItem } from "../../interface";
import Sequence from "../home/components/Sequence";
import FolderNavItem from "./DirectoryItem";
import FileItem from "./FileItem";
import Title from "./Title";

export const SIDE_WIDTH = "33.33%";

interface iProps {
  title: string;
  items: Array<iFileItem>;
}

function Sider({ title, items }: iProps) {
  return (
    <nav>
      <Title title={title}></Title>
      <div
        id="sider"
        className="z-100 fixed left-0 h-screen overflow-auto bg-gray-900 shadow-md transition-all duration-50"
        style={{ width: SIDE_WIDTH }}
      >
        <Sequence items={items}>
          <ul className="text-[12px] pt-[48px]">
            {items.map((item, key) =>
              item.type == "directory" ? (
                <FolderNavItem key={key} item={item}></FolderNavItem>
              ) : (
                <FileItem key={key} item={item}></FileItem>
              )
            )}
          </ul>
        </Sequence>
      </div>
    </nav>
  );
}

export default Sider;

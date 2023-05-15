import { iFileItem } from "../../interface";
import FileItem from "./FileItem";
import DirectoryItem from "./DirectoryItem";
import Title from "./Title";
import Sequence from "../[dir]/components/Sequence";

interface iProps {
  dir: string;
  title: string;
  items: Array<iFileItem>;
}

function Sider({ dir, title, items }: iProps) {
  return (
    <nav
      id="sider"
      className="z-50 fixed top-0 left-0 h-screen w-[240px] overflow-auto bg-gray-900 shadow-md transition-all duration-50"
    >
      <Title title={title}></Title>
      <Sequence items={items}>
        <ul className="text-[12px] pl-1 pt-[48px]">
          {items.map((item, key) =>
            item.type == "directory" ? (
              <DirectoryItem
                dir={decodeURIComponent(dir)}
                key={key}
                item={item}
              ></DirectoryItem>
            ) : (
              <FileItem dir={dir} key={key} item={item}></FileItem>
            )
          )}
        </ul>
      </Sequence>
    </nav>
  );
}

export default Sider;

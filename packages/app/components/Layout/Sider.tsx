import { iFileItem } from "../../interface";
import FileItem from "./FileItem";
import DirectoryItem from "./DirectoryItem";
import Title from "./Title";
import Sequence from "../[dir]/components/Sequence";

export const SIDE_WIDTH = "33.33%";

interface iProps {
  dir: string;
  title: string;
  items: Array<iFileItem>;
}

function Sider({ dir, title, items }: iProps) {
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
      </div>
    </nav>
  );
}

export default Sider;

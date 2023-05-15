import { useMemo } from "react";
import { iFileItem } from "../../interface";
import { useDirectoryNavItem } from "../[dir]/service";
import DirectoryFiles from "./DirectoryFiles";
import Filename from "./Filename";

interface iProps {
  dir: string;
  item: iFileItem;
}

function DirectoryItem({ dir, item }: iProps) {
  const { active, opened, files, onClick } = useDirectoryNavItem(item);

  return (
    <li className="directory-item cursor-pointer text-[12px] text-white">
      <Filename ext={item.extension} active={active} onClick={onClick}>
        {item.name}
      </Filename>
      <DirectoryFiles dir={dir} opened={opened} files={files}></DirectoryFiles>
    </li>
  );
}

export default DirectoryItem;

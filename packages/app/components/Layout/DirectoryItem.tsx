"use client";

import { useMemo } from "react";
import { iFileItem } from "../../interface";
import { useDirectoryNavItem } from "../[dir]/service";
import FileItem from "./FileItem";

interface iDirectoryFilesProps {
  dir: string;
  opened: boolean;
  files: iFileItem[];
}

function DirectoryFiles({ dir, opened, files }: iDirectoryFilesProps) {
  if (!opened) return null;
  return (
    <div className="px-2 border border-gray-200">
      <ul>
        {files.map((child: iFileItem, index: number) => {
          return (
            <div key={index}>
              {child.type == "directory" ? (
                <DirectoryItem dir={dir} item={child}></DirectoryItem>
              ) : (
                <FileItem dir={dir} item={child as iFileItem}></FileItem>
              )}
            </div>
          );
        })}
      </ul>
    </div>
  );
}

interface iProps {
  dir: string;
  item: iFileItem;
}

function DirectoryItem({ dir, item }: iProps) {
  const { active, opened, files, onClick } = useDirectoryNavItem(item);

  const className = useMemo(() => {
    let name = "px-2 py-2 mb-0 line-clamp-1 font-bold";
    return name + (active ? " bg-blue-900 font-semibold" : "");
  }, [active]);

  return (
    <li className="directory-item cursor-pointer text-[12px] text-white">
      <p className={className} onClick={onClick}>
        {item.name}
      </p>
      <DirectoryFiles dir={dir} opened={opened} files={files}></DirectoryFiles>
    </li>
  );
}

export default DirectoryItem;

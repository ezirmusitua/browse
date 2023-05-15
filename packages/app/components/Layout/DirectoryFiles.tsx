import { useMemo } from "react";
import { iFileItem } from "../../interface";
import { useDirectoryNavItem } from "../[dir]/service";
import FileItem from "./FileItem";
import DirectoryItem from "./DirectoryItem";

interface iDirectoryFilesProps {
  dir: string;
  opened: boolean;
  files: iFileItem[];
}

function DirectoryFiles({ dir, opened, files }: iDirectoryFilesProps) {
  if (!opened) return null;
  return (
    <div className="pl-2 border border-gray-200">
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

export default DirectoryFiles;

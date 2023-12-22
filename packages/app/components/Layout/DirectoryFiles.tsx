import { iFileItem } from "../../interface";
import FolderNavItem from "./DirectoryItem";
import FileItem from "./FileItem";

interface iFolderFilesProps {
  opened: boolean;
  files: iFileItem[];
}

function FolderFiles({ opened, files }: iFolderFilesProps) {
  if (!opened) return null;
  return (
    <div className="pl-2 border border-gray-200">
      <ul>
        {files.map((child: iFileItem, index: number) => {
          return (
            <div key={index}>
              {child.type == "directory" ? (
                <FolderNavItem item={child}></FolderNavItem>
              ) : (
                <FileItem item={child as iFileItem}></FileItem>
              )}
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default FolderFiles;

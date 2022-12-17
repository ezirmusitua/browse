import * as path from "path";
import { iFileItem } from "../../interface";
import FileItem from "./FileItem";

async function load_directory(path: string) {
  try {
    const resp = await fetch(
      `http://127.0.0.1:8080/api/file_info?path=${encodeURIComponent(path)}`
    );
    return resp.json();
  } catch (e) {
    console.log("[ERROR] load directory failed ", e);
    return { children: [] };
  }
}

interface iProps {
  dir: string;
  item: iFileItem;
}

async function DirectoryItem({ dir, item }: iProps) {
  const { children } = await load_directory(path.join(item.parent, item.name));
  return (
    <li className="text-[12px] text-white">
      <ul className="px-2">
        <p className="py-2 mb-0 line-clamp-1 font-bold">{item.name}</p>
        <div className="border border-gray-200">
          {children.map((child: iFileItem, index: number) => (
            <div key={index}>
              {child.type == "directory" ? (
                // @ts-expect-error Server Component
                <DirectoryItem dir={dir} item={child}></DirectoryItem>
              ) : (
                <FileItem dir={dir} item={child as iFileItem}></FileItem>
              )}
            </div>
          ))}
        </div>
      </ul>
    </li>
  );
}

export default DirectoryItem;

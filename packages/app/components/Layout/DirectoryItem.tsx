"use client";
import * as path from "path";
import { useCallback, useEffect, useState } from "react";
import { iFileItem } from "../../interface";
import FileItem from "./FileItem";

async function load_directory(path: string) {
  console.log("[INFO] loading directory ", path);
  try {
    const resp = await fetch(
      `http://localhost:8080/api/file_info?path=${encodeURIComponent(path)}`
    );
    return resp.json();
  } catch (e) {
    console.log(`[ERROR] -> load failed ${e.message}`);
    return { children: [] };
  }
}

interface iProps {
  dir: string;
  item: iFileItem;
}

function DirectoryItem({ dir, item }: iProps) {
  const [collapsed, set_collapsed] = useState(true);
  const [children, set_children] = useState([]);
  const [loading, set_loading] = useState(false);

  const toggle_collapsed = useCallback(
    () => set_collapsed(!collapsed),
    [collapsed]
  );

  const load = useCallback(async () => {
    if (collapsed) return;
    if (loading) return;
    if (children.length != 0) return;
    set_loading(true);
    const ret = await load_directory(path.join(item.parent, item.name));
    set_loading(false);
    set_children(ret.children);
    console.log("[DEBUG] load ", ret);
  }, [collapsed, loading, children, item.parent, item.name]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <li className="cursor-pointer text-[12px] text-white">
      <ul className="px-2">
        <p
          className="py-2 mb-0 line-clamp-1 font-bold"
          onClick={toggle_collapsed}
        >
          {item.name}
        </p>
        {!collapsed && (
          <div className="border border-gray-200">
            {children.map((child: iFileItem, index: number) => (
              <div key={index}>
                {child.type == "directory" ? (
                  <DirectoryItem dir={dir} item={child}></DirectoryItem>
                ) : (
                  <FileItem dir={dir} item={child as iFileItem}></FileItem>
                )}
              </div>
            ))}
          </div>
        )}
      </ul>
    </li>
  );
}

export default DirectoryItem;

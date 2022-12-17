"use client";
import * as path from "path";
import { useCallback, useEffect, useMemo, useState } from "react";
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
  onActive?: {
    (_: boolean): void;
  };
}

function DirectoryItem({ dir, item, onActive }: iProps) {
  const [active, set_active] = useState(false);
  const [collapsed, set_collapsed] = useState(true);
  const [children, set_children] = useState([]);
  const [loading, set_loading] = useState(false);

  const toggle_collapsed = useCallback(
    () => set_collapsed(!collapsed),
    [collapsed]
  );

  const load = useCallback(async () => {
    if (loading || collapsed || children.length != 0) return;
    set_loading(true);
    const ret = await load_directory(path.join(item.parent, item.name));
    set_loading(false);
    set_children(ret.children);
  }, [collapsed, loading, children, item.parent, item.name]);

  const onChildActive = useCallback(
    (active: boolean) => {
      if (onActive) {
        onActive(active);
      }
      set_active(active);
      if (collapsed && active) {
        set_collapsed(false);
      }
    },
    [onActive, collapsed]
  );

  const className = useMemo(() => {
    let name = "px-2 py-2 mb-0 line-clamp-1 font-bold";
    return name + (active ? " bg-blue-900 font-semibold" : "");
  }, [active]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <li className="cursor-pointer text-[12px] text-white">
      <ul className="">
        <p className={className} onClick={toggle_collapsed}>
          {item.name}
        </p>
        {!collapsed && (
          <div className="px-2 border border-gray-200">
            {children.map((child: iFileItem, index: number) => (
              <div key={index}>
                {child.type == "directory" ? (
                  <DirectoryItem
                    dir={dir}
                    item={child}
                    onActive={onActive}
                  ></DirectoryItem>
                ) : (
                  <FileItem
                    dir={dir}
                    item={child as iFileItem}
                    onActive={onChildActive}
                  ></FileItem>
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

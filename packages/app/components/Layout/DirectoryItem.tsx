"use client";
import { useSearchParams } from "next/navigation";
import * as path from "path";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getJson } from "../../fetch";
import { iFileItem } from "../../interface";
import FileItem from "./FileItem";

async function loadDirectory(path: string) {
  return getJson("/api/file_info", null, { path });
}

interface iProps {
  dir: string;
  item: iFileItem;
  depth: number;
}

function DirectoryItem({ dir, item, depth }: iProps) {
  const params = useSearchParams();
  const active = useMemo(() => {
    const path = decodeURIComponent(params.get("path") + "");
    const dir_relative = path.replace(dir, "");
    const ancestors = dir_relative.split("/").slice(1, -1);
    return ancestors.includes(item.name);
  }, [params, item.name, dir]);

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
    const ret = await loadDirectory(path.join(item.parent, item.name));
    set_loading(false);
    set_children(ret.children);
  }, [collapsed, loading, children, item.parent, item.name]);

  useEffect(() => {
    if (active && collapsed) {
      set_collapsed(false);
    }
  }, [active, collapsed]);

  const className = useMemo(() => {
    let name = "px-2 py-2 mb-0 line-clamp-1 font-bold";
    return name + (active ? " bg-blue-900 font-semibold" : "");
  }, [active]);

  const next_depth = useMemo(() => depth + 1, [depth]);

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
                    depth={next_depth}
                  ></DirectoryItem>
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

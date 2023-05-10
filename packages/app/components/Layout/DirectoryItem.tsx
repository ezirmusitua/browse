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

  const [collapsed, setCollapsed] = useState(true);
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(false);

  const className = useMemo(() => {
    let name = "px-2 py-2 mb-0 line-clamp-1 font-bold";
    return name + (active ? " bg-blue-900 font-semibold" : "");
  }, [active]);

  const next_depth = useMemo(() => depth + 1, [depth]);

  const toggleCollapsed = useCallback(
    () => setCollapsed(!collapsed),
    [collapsed]
  );

  const load = useCallback(async () => {
    if (loading || collapsed || children.length != 0) return;
    setLoading(true);
    const ret = await loadDirectory(item.path);
    setLoading(false);
    setChildren(ret.children);
  }, [collapsed, loading, children, item.path]);

  useEffect(() => {
    if (active && collapsed) {
      setCollapsed(false);
    }
  }, [active, collapsed]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <li className="directory-item cursor-pointer text-[12px] text-white">
      <ul className="">
        <p className={className} onClick={toggleCollapsed}>
          {item.name}
        </p>
        {!collapsed && (
          <div className="px-2 border border-gray-200">
            {children.map((child: iFileItem, index: number) => {
              return (
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
              );
            })}
          </div>
        )}
      </ul>
    </li>
  );
}

export default DirectoryItem;

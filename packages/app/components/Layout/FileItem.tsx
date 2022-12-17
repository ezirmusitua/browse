"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";
import { iFileItem } from "../../interface";

interface iProps {
  dir: string;
  item: iFileItem;
  onActive: {
    (_: boolean): void;
  };
}

export function FileItem({ dir, item, onActive }: iProps) {
  const params = useSearchParams();
  const active = useMemo(
    () => item.name == decodeURIComponent(params.get("path")).split("/").pop(),
    [params, item.name]
  );

  useEffect(() => {
    onActive(active);
  }, [active, onActive]);

  const href = useMemo(
    () =>
      `/playlist/${encodeURIComponent(dir)}?path=${encodeURIComponent(
        `${item.parent}/${item.name}`
      )}`,
    [dir, item.parent, item.name]
  );

  const className = useMemo(() => {
    let name =
      "text-[12px] cursor-pointer pl-2 text-white leading-[24px] line-clamp-1";
    return name + (active ? " bg-blue-800" : "");
  }, [active]);

  const scroll_into_view = useCallback(
    (node: Element) => {
      if (!active || !node) return;
      // @ts-ignore
      node.scrollIntoViewIfNeeded(true);
    },
    [active]
  );

  return (
    <Link href={href}>
      <li
        title={item.name}
        data-srctype="file"
        className={className}
        ref={scroll_into_view}
      >
        {item.name}
      </li>
    </Link>
  );
}

export default FileItem;

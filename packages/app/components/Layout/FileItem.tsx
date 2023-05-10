"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { iFileItem } from "../../interface";

interface iProps {
  dir: string;
  item: iFileItem;
}

export function FileItem({ dir, item }: iProps) {
  const params = useSearchParams();
  const active = useMemo(
    () => item.name == decodeURIComponent(params.get("path")).split("/").pop(),
    [params, item.name]
  );

  const href = useMemo(
    () =>
      `/playlist/${encodeURIComponent(dir)}?path=${encodeURIComponent(
        item.path
      )}`,
    [dir, item.path]
  );

  const className = useMemo(() => {
    const name =
      "file_item cursor-pointer pl-2 text-white text-[12px] leading-[24px] line-clamp-1";
    return name + (active ? " bg-blue-800" : "");
  }, [active]);

  const scrollIntoView = useCallback(
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
        ref={scrollIntoView}
      >
        {item.name}
      </li>
    </Link>
  );
}

export default FileItem;

"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { iFileItem } from "../../interface";

export function FileItem({ item }: { item: iFileItem }) {
  const params = useSearchParams();
  const active = useMemo(() => item.id == params.get("id"), [params, item.id]);
  const href = useMemo(
    () => `/playlist/${encodeURIComponent(item.root)}?id=${item.id}`,
    [item.root, item.id]
  );

  const className = useMemo(() => {
    let name =
      "text-[12px] cursor-pointer pl-2 text-white leading-[24px] line-clamp-1";
    return name + (active ? " bg-blue-900" : "");
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
        id={item.id}
        title={item.name}
        data-id={item.id}
        data-srctype="file"
        className={className}
        ref={scroll_into_view}
      >
        {item.name}
      </li>
    </Link>
  );
}

export function DirectorItem({ item }: { item: iFileItem }) {
  return (
    <li className="text-[12px] text-white">
      <ul className="px-2">
        <p className="py-2 mb-0 line-clamp-1 font-bold">{item.name}</p>
        <div className="border border-gray-200">
          {item.children.map((child, index: number) => (
            <div key={index}>
              {child.type == "directory" ? (
                <DirectorItem item={child}></DirectorItem>
              ) : (
                <FileItem item={child as iFileItem}></FileItem>
              )}
            </div>
          ))}
        </div>
      </ul>
    </li>
  );
}

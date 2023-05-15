"use client";
import Link from "next/link";
import { useMemo } from "react";
import { iFileItem } from "../../interface";
import { useFileItem } from "../[dir]/service";

interface iProps {
  dir: string;
  item: iFileItem;
}

export function FileItem({ item }: iProps) {
  const { active, href, scrollIntoView } = useFileItem(item);

  const className = useMemo(() => {
    const name =
      "file_item cursor-pointer pl-2 text-white text-[12px] leading-[24px] line-clamp-1";
    return name + (active ? " bg-blue-800" : "");
  }, [active]);

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

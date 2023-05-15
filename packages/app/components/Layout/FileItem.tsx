"use client";
import Link from "next/link";
import { iFileItem } from "../../interface";
import { useFileItem } from "../[dir]/service";
import Filename from "./Filename";

interface iProps {
  dir: string;
  item: iFileItem;
}

export function FileItem({ item }: iProps) {
  const { active, href, scrollIntoView } = useFileItem(item);

  return (
    <Link href={href}>
      <li title={item.name} ref={scrollIntoView}>
        <Filename ext={item.extension} active={active} onClick={() => null}>
          {item.name}
        </Filename>
      </li>
    </Link>
  );
}

export default FileItem;

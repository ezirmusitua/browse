import Link from "next/link";
import { useCallback, useMemo } from "react";
import { iFileItem } from "../../interface";
import { useRouterQuery } from "../../utils";
import { useFileItemHref } from "../home/service";
import Filename from "./Filename";

export const useFileItem = (item: iFileItem) => {
  const { path } = useRouterQuery(["path"]);
  const active = useMemo(() => {
    if (!path) return false;
    return item.path == path;
  }, [path, item.path]);
  const getHref = useFileItemHref();

  const scrollIntoView = useCallback(
    (node: Element | null) => {
      if (!active || !node) return;
      // @ts-ignore
      node.scrollIntoViewIfNeeded(true);
    },
    [active]
  );
  const href = useMemo(() => getHref(item.path || ""), [getHref, item.path]);

  return { href, active, scrollIntoView };
};

interface iProps {
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

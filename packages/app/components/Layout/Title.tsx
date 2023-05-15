"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { SIDE_WIDTH } from "./Sider";

function Title({ title }) {
  const [sider, setSider] = useState<Element | null>(null as any);
  const [main, setMain] = useState<Element | null>(null as any);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setSider(document.querySelector("#sider"));
    setMain(document.querySelector("#main"));
  }, []);

  const style = useMemo(
    () => ({
      width: collapsed ? 48 : SIDE_WIDTH,
      justifyContent: collapsed ? "center" : "space-between",
    }),
    [collapsed]
  );

  const toggleCollapsed = useCallback(() => {
    if (!sider) return;
    if (!collapsed) {
      // @ts-ignore
      main.style.paddingLeft = sider.style.width = "0";
    } else {
      // @ts-ignore
      main.style.paddingLeft = sider.style.width = SIDE_WIDTH;
    }
    setCollapsed(!collapsed);
  }, [collapsed, sider, main]);

  return (
    <div
      className="z-50 fixed top-0 left-0 p-2 h-[48px] flex items-center bg-black shadow-md text-white"
      style={style}
    >
      {!collapsed && <p className="mb-0 text-[14px] font-bold">{title}</p>}
      <button className="text-white" onClick={toggleCollapsed}>
        {collapsed ? "▶" : "◀"}
      </button>
    </div>
  );
}

export default Title;

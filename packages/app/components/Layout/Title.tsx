"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

function Title({ title }) {
  const [sider, set_sider] = useState<Element>(null as any);
  const [main, set_main] = useState<Element>(null as any);
  const [collapsed, set_collapsed] = useState(false);

  useEffect(() => {
    set_sider(document.querySelector("#sider"));
    set_main(document.querySelector("#main"));
  }, []);

  const style = useMemo(
    () => ({
      width: collapsed ? 48 : 240,
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
      main.style.paddingLeft = sider.style.width = "240px";
    }
    set_collapsed(!collapsed);
  }, [collapsed, sider, main]);

  return (
    <div
      className="p-2 h-[48px] fixed top-0 left-0 flex items-center bg-black shadow-md text-white"
      style={style}
    >
      {!collapsed && <p className="mb-0 text-[14px] font-bold">{title}</p>}
      <button onClick={toggleCollapsed}>{collapsed ? "▶" : "◀"}</button>
    </div>
  );
}

export default Title;

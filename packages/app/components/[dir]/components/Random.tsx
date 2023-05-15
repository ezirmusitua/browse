"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

async function get_random(dir: string) {
  const url = `http://127.0.0.1:8080/api/random?dir=${dir}`;
  const resp = await fetch(url);
  return resp.json();
}

function Random() {
  const router = useRouter();
  const pathname = usePathname();
  const dir = useMemo(() => (pathname || "").split("/").pop(), [pathname]);
  const onClick = useCallback(async () => {
    const { name, parent } = await get_random(dir);
    router.push(
      `/playlist/${dir}?path=${encodeURIComponent(`${parent}/${name}`)}`
    );
  }, [dir, router]);
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      onClick={onClick}
    >
      <span>🎲</span>
    </div>
  );
}

export default Random;

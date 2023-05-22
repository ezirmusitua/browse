import { useRouter } from "next/router";
import { useCallback } from "react";
import { useRouterQuery } from "../service";

async function getRandom(dir: string) {
  const url = `http://127.0.0.1:8080/api/random?dir=${dir}`;
  const resp = await fetch(url);
  return resp.json();
}

function Random() {
  const router = useRouter();
  const dir = useRouterQuery("dir");
  const onClick = useCallback(async () => {
    const { name, parent } = await getRandom(dir || "");
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

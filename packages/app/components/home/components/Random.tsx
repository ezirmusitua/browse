import { useRouter } from "next/router";
import { useCallback } from "react";
import { useRouterQuery } from "../../../utils";

async function getRandom(dir: string) {
  const url = `http://127.0.0.1:8080/api/random?dir=${dir}`;
  const resp = await fetch(url);
  return resp.json();
}

function Random() {
  const router = useRouter();
  const { root } = useRouterQuery(["root"]);
  const onClick = useCallback(async () => {
    const { name, parent } = await getRandom(root);
    router.push(`/`);
  }, [root, router]);
  return null;
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

import { useCallback, useContext, useEffect, useState } from "react";
import { LoadingContext } from "../Loading";
import { iMimeBaseProps } from "./interface";
// pdf

function canRender(mime: string) {
  const AllowedMime = [
    /text\/.*/gi,
    /application\/json.*/gi,
    /application\/toml.*/gi,
    /application\/.*xml.*/gi,
    /application\/javascript.*/gi,
  ];
  return AllowedMime.some((allowed) => allowed.test(mime));
}

async function getText(src: string) {
  const resp = await fetch(src);
  const content = await resp.text();
  console.log("[DEBUG] content ", content);
  return content;
}

function CodeViewer({ src, mime }: iMimeBaseProps) {
  const { hide: hideLoading } = useContext<{ hide: any }>(LoadingContext);
  const [content, setContent] = useState("");

  const load = useCallback(async () => {
    if (!src) return;
    const data = await getText(src);
    setContent(data);
  }, [src]);

  useEffect(() => {
    load();
  }, [src, load]);

  if (!canRender(mime)) return null;
  return (
    <div className="relative w-full h-full">
      <pre>
        <code>{content}</code>
      </pre>
    </div>
  );
}

export default CodeViewer;

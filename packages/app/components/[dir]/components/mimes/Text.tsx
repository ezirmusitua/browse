import { useCallback, useEffect, useState } from "react";
import { iMimeBaseProps } from "./interface";

const AllowedMimes = [
  /application\/json.*/gi,
  /application\/toml.*/gi,
  /application\/.*xml.*/gi,
  /application\/javascript.*/gi,
  /plain\/text.*/gi,
  /text\/.*/gi,
];

function canRender(mime: string) {
  return AllowedMimes.some((allowed) => allowed.test(mime));
}

async function getText(src: string) {
  const resp = await fetch(src);
  const content = await resp.text();
  return content;
}

function CodeViewer({ src, mime }: iMimeBaseProps) {
  const [content, setContent] = useState("");

  const load = useCallback(async () => {
    if (!src || !canRender(mime)) return;
    const data = await getText(src);
    setContent(data);
  }, [src, mime]);

  useEffect(() => {
    load();
  }, [src, load]);

  if (!canRender(mime)) return null;

  return (
    <div className="relative w-full h-full">
      <pre className="px-6 py-4 bg-gray-100 rounded-md overflow-auto">
        <code>{content}</code>
      </pre>
    </div>
  );
}

export default CodeViewer;

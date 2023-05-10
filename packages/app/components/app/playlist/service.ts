"use client";
import keyboard from "keyboardjs";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";
import { iFileItem } from "../../../interface";

function handle_unload() {
  return fetch("api/shutdown", { method: "POST" });
}

export const usePlaylist = (dir: string, current: iFileItem) => {
  const router = useRouter();

  const mime = useMemo(() => current.mime, [current.mime]);

  const src = useMemo(
    () =>
      `${process.env.NEXT_PUBLIC_ASSET_BASE}/?path=${encodeURIComponent(
        current.path
      )}`,
    [current.path]
  );

  const handleUp = useCallback(
    (e: Event) => {
      e.preventDefault();
      if (current.sequence[0]) {
        return router.push(
          `/playlist/${encodeURIComponent(dir)}?path=${encodeURIComponent(
            current.sequence[0]
          )}`
        );
      }
    },
    [dir, current.sequence, router]
  );

  const handleDown = useCallback(
    (e: Event) => {
      e.preventDefault();
      if (current.sequence[1]) {
        return router.push(
          `/playlist/${encodeURIComponent(dir)}?path=${encodeURIComponent(
            current.sequence[1]
          )}`
        );
      }
    },
    [dir, current.sequence, router]
  );

  useEffect(() => {
    keyboard.bind("up", handleUp);
    keyboard.bind("down", handleDown);
    window.onunload = handle_unload;
    return () => {
      keyboard.unbind("up", handleUp);
      keyboard.unbind("down", handleDown);
    };
  }, [handleUp, handleDown]);

  return { src, mime };
};

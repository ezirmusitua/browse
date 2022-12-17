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
      `/api/file?path=${encodeURIComponent(
        `${current.parent}/${current.name}`
      )}`,
    [current.parent, current.name]
  );

  const handle_up = useCallback(
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

  const handle_down = useCallback(
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
    keyboard.bind("up", handle_up);
    keyboard.bind("down", handle_down);
    window.onunload = handle_unload;
    return () => {
      keyboard.unbind("up", handle_up);
      keyboard.unbind("down", handle_down);
    };
  }, [handle_up, handle_down]);

  return { src, mime };
};

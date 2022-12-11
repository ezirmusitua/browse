"use client";
import keyboard from "keyboardjs";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";
import { iFileItem } from "../../../interface";

function handle_unload() {
  return fetch("api/shutdown", { method: "POST" });
}

export const usePlaylist = (current: iFileItem) => {
  const router = useRouter();

  const mime = useMemo(() => current.mime, [current.mime]);

  const src = useMemo(
    () => `/api/file?id=${current.id}&dir=${current.root}`,
    [current.id, current.root]
  );

  const handle_up = useCallback(() => {
    if (current.sequence[0]) {
      return router.push(
        `/playlist/${encodeURIComponent(current.root)}?id=${
          current.sequence[0]
        }`
      );
    }
  }, [current.sequence, router, current.root]);

  const handle_down = useCallback(() => {
    if (current.sequence[1]) {
      return router.push(
        `/playlist/${encodeURIComponent(current.root)}?id=${
          current.sequence[1]
        }`
      );
    }
  }, [current.sequence, router, current.root]);

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

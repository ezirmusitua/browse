"use client";
import keyboard, { KeyEvent } from "keyboardjs";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getFileInfo } from "../../fetch";
import { iFileItem } from "../../interface";
import {
  cacheDirectoryClosed,
  cacheDirectoryOpened,
  initializePlaylist,
  isDirectoryOpened,
} from "../../storage";
import { buildHref } from "../../utils";
import { SequenceContext } from "./components/Sequence";

export const useRouterQuery = (field: string) => {
  const router = useRouter();
  const value = useMemo(() => {
    const _v = router.query[field];
    if (!_v) return undefined;
    return decodeURIComponent(_v + "");
  }, [router.query, field]);
  return value;
};

export const useFileInfo = (path?: string) => {
  const [file, setFile] = useState(null as any);

  const load = useCallback(async () => {
    if (!path) return;
    const data = await getFileInfo(path);
    setFile(data);
  }, [path]);

  useEffect(() => {
    load();
  }, [load]);

  return { file };
};

export const usePlaylist = () => {
  const dir = useRouterQuery("dir");
  const { file: root } = useFileInfo(dir);
  const [initialized, setInitialized] = useState(false);

  const initialize = useCallback(async () => {
    if (!root) return;
    await initializePlaylist(
      root.path,
      root.children.map((i: iFileItem) => i.path)
    );
    setInitialized(true);
  }, [root]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return { root, initialized };
};

export const usePlaylistPreview = () => {
  const path = useRouterQuery("path");
  const { file: current } = useFileInfo(path);
  const mime = useMemo(() => current?.mime, [current?.mime]);
  const src = useMemo(
    () =>
      current
        ? `${process.env.NEXT_PUBLIC_ASSET_BASE}/?path=${encodeURIComponent(
            current.path
          )}`
        : undefined,
    [current]
  );

  return { src, mime };
};

export const useDirectoryNavItem = (item: iFileItem) => {
  const { updateSequence } = useContext(SequenceContext);
  const [opened, setOpened] = useState(false);
  const [files, setFiles] = useState(item.children || []);
  const [loading, setLoading] = useState(false);
  const path = useRouterQuery("path");

  const active = useMemo(() => {
    if (!path) return false;
    return path.startsWith(item.path);
  }, [path, item.path]);

  const load = useCallback(async () => {
    if (loading || files.length != 0) return;
    setLoading(true);
    const ret = await getFileInfo(item.path);
    setLoading(false);
    setFiles(ret.children);
    updateSequence(item.path, ret.children);
    await cacheDirectoryOpened(item.path);
  }, [loading, files, item.path, updateSequence]);

  const onClick = useCallback(async () => {
    if (opened) {
      setOpened(false);
      await cacheDirectoryClosed(item.path);
      return;
    } else {
      await load();
      setOpened(true);
    }
  }, [opened, load, item.path]);

  useEffect(() => {
    (async () => {
      const _opened = await isDirectoryOpened(item.path);
      setOpened(_opened);
      if (_opened) {
        load();
      }
    })();
  }, [item.path, load]);

  return { active, opened, files, onClick };
};

const useFileItemHref = () => {
  const dir = useRouterQuery("dir");
  const getHref = useCallback(
    (path: string) => {
      if (!path || !dir) return "";
      return buildHref(dir, { path });
    },
    [dir]
  );
  return getHref;
};

export const useFileItem = (item: iFileItem) => {
  const path = useRouterQuery("path");
  const active = useMemo(() => {
    if (!path) return false;
    return item.path == path;
  }, [path, item.path]);
  const getHref = useFileItemHref();

  const scrollIntoView = useCallback(
    (node?: Element) => {
      if (!active || !node) return;
      // @ts-ignore
      node.scrollIntoViewIfNeeded(true);
    },
    [active]
  );
  const href = useMemo(() => getHref(item.path || ""), [getHref, item.path]);

  return { href, active, scrollIntoView };
};

export const useSequence = (items: iFileItem[]) => {
  const router = useRouter();
  const [sequence, setSequence] = useState<string[]>([]);
  const current_path = useRouterQuery("path");
  const current_index = useMemo(
    () => sequence.findIndex((p) => p === current_path),
    [sequence, current_path]
  );
  const getHref = useFileItemHref();

  const goto = useCallback(
    (e: KeyEvent, direction = 1) => {
      e.preventDefault();
      let new_index = current_index + direction;
      if (new_index < 0 || new_index >= sequence.length) return;
      const href = getHref(sequence[new_index]);
      router.push(href);
    },
    // eslint-disable-next-line
    [current_index, sequence, getHref]
  );

  const handleUp = useCallback((e: KeyEvent) => goto(e, -1), [goto]);

  const handleDown = useCallback(goto, [goto]);

  const updateSequence = useCallback(
    (path: string, children: iFileItem[]) => {
      const idx = sequence.findIndex((p) => p === path);
      const new_sequence = sequence
        .slice(0, idx + 1)
        .concat(children.map((f) => f.path))
        .concat(sequence.slice(idx + 1));
      setSequence(new_sequence);
    },
    [sequence]
  );

  useEffect(() => {
    keyboard.bind("up", handleUp);
    keyboard.bind("down", handleDown);
    return () => {
      keyboard.unbind("up", handleUp);
      keyboard.unbind("down", handleDown);
    };
  }, [handleUp, handleDown]);

  useEffect(() => {
    const new_sequence = items.map((f) => f.path);
    setSequence(new_sequence);
  }, [items]);

  return { updateSequence };
};

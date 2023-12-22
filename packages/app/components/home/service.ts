import { useCallback, useEffect, useState } from "react";
import { getFileInfo } from "../../fetch";
import { iFileItem } from "../../interface";
import { listEndpoints, initializeFolder } from "../../storage";
import { buildHref, useRouterQuery } from "../../utils";

export const useFileInfo = (path?: string) => {
  const [file, setFile] = useState(null as any);

  const load = useCallback(async () => {
    if (!path) return;
    try {
      const data = await getFileInfo(path);
      setFile(data);
    } catch (e) {
      console.log(`[ERROR] file ${path} not found, ${e.message}`);
    }
  }, [path]);

  useEffect(() => {
    load();
  }, [load]);

  return { file };
};

export const useFolder = () => {
  const { root } = useRouterQuery(["root"]);
  const { file: root_dir } = useFileInfo(root);
  const [stage, setStage] = useState("mounted");

  const initialize = useCallback(async () => {
    if (stage != "mounted") return;
    const settings = await listEndpoints();
    if (!settings.length) {
      setStage("not-initialized");
      return;
    }
    if (root_dir) {
      await initializeFolder(
        root_dir.path,
        root_dir.children.map((i: iFileItem) => i.path)
      );
      setStage("initialized");
    }
  }, [root_dir, stage]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return { root_dir, stage };
};

export const useFileItemHref = () => {
  const { root } = useRouterQuery(["root"]);
  const getHref = useCallback(
    (path: string) => {
      if (!path || !root) return "";
      return buildHref({ root, path });
    },
    [root]
  );
  return getHref;
};

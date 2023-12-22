import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { getFileInfo } from "../../fetch";
import { iFileItem } from "../../interface";
import { cacheFolderClosed, cacheFolderOpened } from "../../storage";
import { useRequest, useRouterQuery } from "../../utils";
import { SequenceContext } from "../home/components/Sequence";
import FolderFiles from "./DirectoryFiles";
import Filename from "./Filename";

interface iState {
  opened: boolean;
  files: iFileItem[];
  item: iFileItem;
}

interface iAction {
  type: string;
  payload: any;
}

const InitialState: iState = { opened: false, files: [], item: null as any };

export const useFolderNavItem = (item: iFileItem) => {
  const { path, root } = useRouterQuery(["path", "root"]);
  const [state, dispatch] = useReducer(
    (state: iState, action: iAction) => {
      switch (action.type) {
        case "toggleOpened":
          return { ...state, opened: !state.opened };
        case "changeFiles":
          return { ...state, files: action.payload };
      }
      return { ...state };
    },
    { ...InitialState, item }
  );
  const { updateSequence, store } = useContext(SequenceContext);

  const active = useMemo(() => {
    if (!path) return false;
    return path.startsWith(state.item.path + "/");
  }, [path, state.item.path]);

  const { run: loadFiles } = useRequest(() => getFileInfo(state.item.path), {
    onSuccess: (data) => {
      // cacheFolderOpened(root, item.path);
      updateSequence(item.path, data.children);
      dispatch({ type: "changeFiles", payload: data.children });
    },
    onError: (e) => {
      console.log(`[ERROR] file ${item.path} not found, ${e.message}`);
    },
  });

  useEffect(() => {
    if (!store) return;
    console.log("[DEBUG] -> ", state.item.path, store[state.item.path]);
    if (store[state.item.path]) {
      // loadFiles();
    }
  }, []);

  const onClick = useCallback(async () => {
    console.log("[DEBUG] on folder nav item click ", state.opened);
    dispatch({ type: "toggleOpened", payload: undefined });
    if (state.opened) {
      cacheFolderClosed(root, item.path);
    }
  }, [state.opened, item.path, root]);

  // const initialize = useCallback(() => {
  //   if (!store || !item) return;
  //   const _opened = Boolean(store[item.path]);
  //   console.log("[DEBUG] -> opened", item.name, _opened);
  //   setOpened(_opened);
  //   if (!_opened) return;
  //   loadFiles();
  // }, [store, item, loadFiles]);
  //
  // useEffect(() => {
  //   initialize();
  // }, [initialize]);

  return { ...state, active, onClick };
};

interface iProps {
  item: iFileItem;
}

function FolderNavItem({ item }: iProps) {
  const { active, opened, files, onClick } = useFolderNavItem(item);

  return (
    <li className="folder-item cursor-pointer text-[12px] text-white">
      <Filename ext={item.extension} active={active} onClick={onClick}>
        {item.name}
      </Filename>
      <FolderFiles opened={opened} files={files}></FolderFiles>
    </li>
  );
}

export default FolderNavItem;

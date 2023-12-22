import keyboard, { KeyEvent } from "keyboardjs";
import { useRouter } from "next/router";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { iFileItem } from "../../../interface";
import { getFolderStore } from "../../../storage";
import { useRouterQuery } from "../../../utils";
import { useFileItemHref } from "../service";

export const useSequence = (items: iFileItem[]) => {
  const router = useRouter();
  const [sequence, setSequence] = useState<string[]>([]);
  const { path: current_path } = useRouterQuery(["path"]);
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

export const SequenceContext = createContext({
  store: null as any,
  updateSequence: (p: string, f: iFileItem[]) => null as any,
});

function Sequence({
  children,
  items,
}: {
  children: React.ReactNode;
  items: iFileItem[];
}) {
  const { root } = useRouterQuery(["root"]);
  const sequence = useSequence(items);
  const [store, setStore] = useState<Record<string, boolean>>({});

  const initialize = useCallback(async () => {
    if (!root) return null;
    const _store = await getFolderStore(root);
    setStore(_store as any);
  }, [root]);

  const context_value = useMemo(() => {
    return { ...sequence, store };
  }, [store, sequence]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <SequenceContext.Provider value={context_value}>
      {children}
    </SequenceContext.Provider>
  );
}

export default Sequence;

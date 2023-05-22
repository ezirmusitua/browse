"use client";

import { createContext } from "react";
import { iFileItem } from "../../../interface";
import { useSequence } from "../service";

export const SequenceContext = createContext({
  updateSequence: (p: string, f: iFileItem[]) => null as any,
});

function Sequence({
  children,
  items,
}: {
  children: React.ReactNode;
  items: iFileItem[];
}) {
  const sequence = useSequence(items);
  return (
    <SequenceContext.Provider value={sequence}>
      {children}
    </SequenceContext.Provider>
  );
}

export default Sequence;

"use client";

import { useSearchParams } from "next/navigation";
import React, { useCallback, useContext, useEffect, useState } from "react";

export const LoadingContext = React.createContext({
  loading: true,
  show: () => null as any,
  hide: () => null as any,
});

function Loading() {
  const { loading } = useContext(LoadingContext);
  if (!loading) return null;
  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 bg-gray-800 flex justify-center items-center">
      <p className="text-[36px] animate-spin">🔄</p>
    </div>
  );
}

export default Loading;

export function WithLoading({ children }: { children: React.ReactNode }) {
  const [loading, set_loading] = useState(true);
  const search_params = useSearchParams();
  useEffect(() => {
    set_loading(true);
  }, [search_params]);
  const show = useCallback(() => set_loading(true), []);
  const hide = useCallback(() => set_loading(false), []);
  return (
    <LoadingContext.Provider value={{ loading, show, hide }}>
      {children}
    </LoadingContext.Provider>
  );
}

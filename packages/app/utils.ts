import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";

export function buildHref(params: Record<string, any> = {}) {
  return `/folder?${new URLSearchParams(params)}`;
}

interface iUseRequestOptions {
  onSuccess?: {
    (data: any): void;
  };
  onError?: {
    (error: any): void;
  };
}

export const useRequest = (action: any, options: iUseRequestOptions) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null as any);

  const run = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const _data = await action();
      setData(_data);
      options.onSuccess && options.onSuccess(_data);
    } catch (e) {
      options.onError && options.onError(e);
    }
    setLoading(false);
  }, [loading, action, options]);

  return { data, run };
};

export const useRouterQuery = (fields: string[]) => {
  const router = useRouter();
  const value = useMemo(() => {
    return fields.reduce((acc: Record<string, any>, field: string) => {
      const _v = router.query[field];
      acc[field] = (_v && decodeURIComponent(_v + "")) || "";
      return acc;
    }, {});
  }, [router.query, fields]);
  return value;
};

export function buildHref(dir: string, params: Record<string, any> = {}) {
  return `/${encodeURIComponent(dir)}?${new URLSearchParams(params)}`;
}

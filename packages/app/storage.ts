import localforage from "localforage";

localforage.config({ name: "browse__dev" });

export async function getFolderStore(
  root: string
): Promise<Record<string, boolean>> {
  let stored = await localforage.getItem(root);
  if (!stored) return {};
  return stored as Record<string, boolean>;
}

export async function initializeFolder(dir: string, files: string[]) {
  let stored = await getFolderStore(dir);
  stored = files.reduce((acc: Record<string, boolean>, file: string) => {
    acc[file] = Boolean(stored[file]);
    return acc;
  }, {});
  await localforage.setItem(dir, stored);
  return stored;
}

export async function cacheFolderOpenStatus(
  dir: string,
  file: string,
  opened: boolean
) {
  const stored = await getFolderStore(dir);
  const updated = { ...stored, [file]: opened };
  localforage.setItem(dir, updated);
  return updated;
}

export async function cacheFolderOpened(dir: string, file: string) {
  return cacheFolderOpenStatus(dir, file, true);
}

export async function cacheFolderClosed(dir: string, file: string) {
  return cacheFolderOpenStatus(dir, file, false);
}
export interface iEndpoint {
  name: string;
  api: string;
  root: string;
  token?: string;
}

export async function listEndpoints() {
  let stored = await localforage.getItem("__settings");
  if (!stored) return [];
  return stored as iEndpoint[];
}

export async function getEndpoint(name: string) {
  const store = await listEndpoints();
  return store.find((item) => item.name === name) || undefined;
}

export async function addEndpoint(endpoint: iEndpoint) {
  let stored = await listEndpoints();
  stored.push(endpoint);
  await localforage.setItem("__settings", stored);
  return stored;
}

export async function removeEndpoint(name: string) {
  let stored = await listEndpoints();
  stored = stored.filter((item) => item.name != name);
  await localforage.setItem("__settings", stored);
  return stored;
}

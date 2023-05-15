import localforage from "localforage";

localforage.config({ name: "browse__dev" });

let _playlist: string = undefined as any;
let _stored: Record<string, boolean> = {};

async function getStored(playlist: string) {
  let stored = await localforage.getItem(playlist);
  if (!stored) return {};
  return stored;
}

export async function initializePlaylist(playlist: string, files: string[]) {
  _playlist = playlist;
  const stored = await getStored(playlist);
  _stored = files.reduce((acc: Record<string, boolean>, file: string) => {
    acc[file] = Boolean(stored[file]);
    return acc;
  }, {});
  await localforage.setItem(playlist, _stored);
  return { ..._stored };
}

export async function cacheDirectoryOpened(file: string) {
  const updated = { ..._stored, [file]: true };
  localforage.setItem(_playlist, updated);
  _stored = updated;
}

export async function cacheDirectoryClosed(path: string) {
  const updated = { ..._stored, [path]: false };
  localforage.setItem(_playlist, updated);
  _stored = updated;
}

export async function isDirectoryOpened(path: string) {
  return _stored[path];
}

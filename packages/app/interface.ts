export enum eFileType {
  FILE = "file",
  DIRECTORY = "directory",
}

export interface iFileItem {
  id: string;
  name: string;
  parent: string;
  type: eFileType;
  sequence: [string, string];
  mime: string;
  children: iFileItem[];
}

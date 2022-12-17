export enum eFileType {
  FILE = "file",
  DIRECTORY = "directory",
}

export interface iFileItem {
  name: string;
  parent: string;
  type: eFileType;
  sequence: string[];
  mime: string;
  children: iFileItem[];
}

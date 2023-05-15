export enum eFileType {
  FILE = "file",
  DIRECTORY = "directory",
}

export interface iShallowFileItem {
  name: string;
  parent: string;
  extension: string;
  path: string;
  type: eFileType;
  mime: string;
  modified_at: number;
  created_at: number;
}

export interface iFileItem extends iShallowFileItem {
  children?: iShallowFileItem[];
}

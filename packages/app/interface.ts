export interface iFileItem {
  id: string;
  name: string;
  dir: string;
  root: string;
  type: "file" | "directory";
  sequence: [string, string];
  mime: string;
  children: iFileItem[];
}

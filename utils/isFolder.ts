import { File, Folder } from "@/models/Files";

export function isFolder(item: File | Folder): item is Folder {
  return (item as Folder).children !== undefined;
}

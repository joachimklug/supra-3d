import { FileFolder } from "@/models/Files";
import { fetchWithKey } from "./withKeys";

export const fetchFilesAndFolders = async () =>
  await fetchWithKey<RawFiles>("/api/files").then((result) => toFiles(result.files, null));

const toFiles = (files: RawFileFolder[], parent: number | null, currentId = 0): FileFolder[] =>
  files.map((item) => {
    currentId++;
    return {
      ...item,
      id: currentId,
      parent,
      children: item.children ? toFiles(item.children, currentId, currentId) : undefined,
    } as FileFolder;
  });

interface RawFiles {
  files: RawFolder[];
  free: string;
  total: string;
}

interface RawFolder {
  name: string;
  path: string;
  display: string;
  date: number | null;
  size: number;
  type: Type;
  typePath: Type[];
  origin: Origin;
  refs: FolderRefs;
  children: RawFileFolder[];
  ro?: boolean;
}

interface RawFile {
  name: string;
  path: string;
  display: string;
  date: number;
  size: number;
  type: Type;
  typePath: Type[];
  origin: Origin;
  refs: FileRefs;
  hash: null;
  gcodeAnalysis: GcodeAnalysis;
  ro?: boolean;
  children?: null;
}

type RawFileFolder = RawFile | RawFolder;

interface GcodeAnalysis {
  estimatedPrintTime: number | null;
  material: string | null;
  layerHeight: number | null;
}

type Origin = "local" | "sdcard";

interface FileRefs {
  download: null | string;
  icon: null;
  thumbnail: null | string;
}

type Type = "folder" | "gcode" | "machinecode";

interface FolderRefs {
  resource: null;
}

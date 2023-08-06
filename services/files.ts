import { FileFolder } from "@/models/Files";
import { fetchWithKey, postWithKey } from "./withKeys";

export const startPrint = async (origin: string, path: string) => {
  await postWithKey(`/api/files/${origin}/${path}`, {
    command: "select",
    print: true,
  });
};

export const fetchFilesAndFolders = async () =>
  await fetchWithKey<RawFiles>("/api/files").then((result) => toFiles(result.files, null));

const toFiles = (files: RawFileFolder[], parent: number | null): FileFolder[] => {
  let currentId = 0;
  const toFilesMapper = (files: RawFileFolder[], parent: number | null): FileFolder[] =>
    files.map((item) => {
      currentId++;
      return {
        ...item,
        id: currentId,
        parent,
        children: item.children ? toFilesMapper(item.children, currentId) : undefined,
      } as FileFolder;
    });
  return toFilesMapper(files, parent);
};

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

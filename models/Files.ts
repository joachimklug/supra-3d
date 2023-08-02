export interface Files {
  files: Folder[];
  free: string;
  total: string;
}

export type FileId = number;

export interface Folder {
  id: FileId;
  parent: FileId | null;
  name: string;
  path: string;
  display: string;
  date: number | null;
  size: number;
  type: "folder";
  typePath: Type[];
  origin: Origin;
  refs: FolderRefs;
  children: FileFolder[];
  ro?: boolean;
}

export interface File {
  id: FileId;
  parent: FileId | null;
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
  // children?: null;
}

export type FileFolder = File | Folder;

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

import { File, FileFolder, FileId } from "@/models/Files";
import { isFolder } from "./isFolder";

export const findFilesByName = (files: FileFolder[], searchString: string): File[] =>
  files.reduce((accumulator, currentValue) => {
    if (isFolder(currentValue)) {
      return [...accumulator, ...findFilesByName(currentValue.children, searchString)];
    }
    if (currentValue.display.toLowerCase().includes(searchString.toLowerCase())) {
      return [...accumulator, currentValue];
    }
    return accumulator;
  }, [] as File[]);

export const findFileByPath = (files: FileFolder[], path: File["path"]): File | undefined => {
  for (const index in files) {
    const node = files[index];
    if (node.path === path && !isFolder(node)) {
      return node;
    }
    if (isFolder(node)) {
      const found = findFileByPath(node.children, path);
      if (found) {
        return found;
      }
    }
  }
};

export const findFileLevelById = (files: FileFolder[], id: FileId): FileFolder[] | undefined => {
  for (const index in files) {
    const node = files[index];
    if (node.id === id) {
      return files;
    }
    if (isFolder(node)) {
      const found = findFileLevelById(node.children, id);
      if (found) {
        return found;
      }
    }
  }
};

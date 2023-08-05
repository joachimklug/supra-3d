import { File, FileFolder, FileId } from "@/models/Files";
import { fetchFilesAndFolders } from "@/services/files";
import { isFolder } from "@/utils/isFolder";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { List, Searchbar } from "react-native-paper";
import { useQuery } from "react-query";

export default function Files() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: files = [], isLoading, isFetching, refetch } = useQuery("fetchFilesAndFolders", fetchFilesAndFolders);
  const [currentFileView, setCurrentFileView] = useState<FileFolder[]>([]);
  const parentId = useRef<FileId[]>([]);
  const router = useRouter();
  const isRootLevel = Boolean(currentFileView?.[0]?.id === files?.[0]?.id);

  useEffect(() => {
    if (!isLoading) {
      setCurrentFileView(files);
    }
  }, [isLoading]);

  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={(search) => {
          setSearchQuery(search);
          search ? setCurrentFileView(findFilesByName(files, search)) : setCurrentFileView(files);
        }}
        onClearIconPress={() => setCurrentFileView(files)}
        value={searchQuery}
        style={{ margin: 2 * 8 }}
      />
      <ScrollView refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}>
        {!isRootLevel && (
          <List.Item
            title="..."
            left={(props) => <List.Icon {...props} icon="arrow-left-top" />}
            onPress={() => {
              setCurrentFileView(findFileLevelById(files, parentId.current.at(-1) ?? 1) ?? files);
              parentId.current.pop();
            }}
          />
        )}
        {currentFileView.sort(sortByFolderAndName).map((item) => {
          const folder = isFolder(item);
          return (
            <List.Item
              key={item.name}
              title={item.display}
              description={folder ? `${item.children.length} items` : undefined}
              left={(props) => <List.Icon {...props} icon={folder ? "folder-outline" : "file-cog-outline"} />}
              onPress={
                folder
                  ? () => {
                      setCurrentFileView(item.children);
                      parentId.current.push(item.id);
                    }
                  : () => router.push({ pathname: "/FileDetails", params: { id: item.id } })
              }
            />
          );
        })}
      </ScrollView>
    </>
  );
}

const sortByFolderAndName = (a: FileFolder, b: FileFolder) => {
  if (a.type !== b.type) {
    if (a.type === "folder") return -1;
    return 1;
  }
  const nameA = a.display.toUpperCase();
  const nameB = b.display.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
};

const findFileLevelById = (files: FileFolder[], id: FileId): FileFolder[] | undefined => {
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

const findFilesByName = (files: FileFolder[], searchString: string): File[] =>
  files.reduce((accumulator, currentValue) => {
    if (isFolder(currentValue)) {
      return [...accumulator, ...findFilesByName(currentValue.children, searchString)];
    }
    if (currentValue.display.toLowerCase().includes(searchString.toLowerCase())) {
      return [...accumulator, currentValue];
    }
    return accumulator;
  }, [] as File[]);

import { File, FileFolder, FileId } from "@/models/Files";
import { fetchFilesAndFolders } from "@/services/files";
import { isFolder } from "@/utils/isFolder";
import { useEffect, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { List, Searchbar } from "react-native-paper";
import { useQuery } from "react-query";

export default function Files() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: files = [], isLoading, isFetching, refetch } = useQuery("fetchFilesAndFolders", fetchFilesAndFolders);
  const [currentFileView, setCurrentFileView] = useState<FileFolder[]>([]);

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
          search ? setCurrentFileView(findFileByName(files, search)) : setCurrentFileView(files);
        }}
        onClearIconPress={() => setCurrentFileView(files)}
        value={searchQuery}
        style={{ margin: 2 * 8 }}
      />
      <ScrollView refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}>
        {Boolean(currentFileView?.[0]?.parent) && (
          <List.Item
            title="..."
            left={(props) => <List.Icon {...props} icon="arrow-left-top" />}
            onPress={() => setCurrentFileView(findFileLevelById(files, currentFileView[0].parent ?? 1))}
          />
        )}
        {currentFileView.sort(sortByFolderAndName).map((item) => {
          const folder = isFolder(item);
          const isEmpty = folder && !item.children.length;
          return (
            <List.Item
              key={item.name}
              title={item.display}
              description={folder ? `${item.children.length} items` : undefined}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon={!folder ? "file-cog-outline" : isEmpty ? "folder-hidden" : "folder-outline"}
                />
              )}
              onPress={folder && !isEmpty ? () => setCurrentFileView(item.children) : undefined}
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

const findFileLevelById = (files: FileFolder[], id: FileId): FileFolder[] => {
  if (files.find((file) => file.id === id)) {
    return files;
  } else {
    for (const index in files) {
      const node = files[index];
      if (isFolder(node)) return findFileLevelById(node.children, id);
    }
  }
  return files;
};

const findFileByName = (files: FileFolder[], searchString: string): File[] =>
  files.reduce((accumulator, currentValue) => {
    if (isFolder(currentValue)) {
      return [...accumulator, ...findFileByName(currentValue.children, searchString)];
    }
    if (currentValue.display.toLowerCase().includes(searchString.toLowerCase())) {
      return [...accumulator, currentValue];
    }
    return accumulator;
  }, [] as File[]);

import { View } from "@/components/Themed";
import { FileImage } from "@/components/fileDetails/FileImage";
import PropertiesTable from "@/components/fileDetails/PropertiesTable";
import { File, FileFolder, FileId } from "@/models/Files";
import { fetchFilesAndFolders } from "@/services/files";
import { isFolder } from "@/utils/isFolder";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator } from "react-native";
import { useQuery } from "react-query";

export default function FileDetails() {
  const { id } = useLocalSearchParams();
  const { data: files = [] } = useQuery("fetchFilesAndFolders", fetchFilesAndFolders);
  const file = searchFileById(files, +id);

  if (!file) {
    return <ActivityIndicator animating={true} />;
  }

  return (
    <View style={{ padding: 2 * 8, flex: 1, display: "flex" }}>
      <FileImage thumbnailRef={file.refs.thumbnail} />
      <PropertiesTable file={file} />
    </View>
  );
}

function searchFileById(files: FileFolder[], id: FileId, reverse = false): File | null {
  const stack = [...files];
  while (stack.length) {
    const node = stack[reverse ? "pop" : "shift"]();
    if (node?.id === id && !isFolder(node)) return node;
    node && isFolder(node) && stack.push(...node.children);
  }
  return null;
}

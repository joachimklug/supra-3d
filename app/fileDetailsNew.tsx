import { View } from "@/components/Themed";
import { File, FileFolder, FileId } from "@/models/Files";
import { fetchFilesAndFolders } from "@/services/files";
import { fetchWithKey } from "@/services/withKeys";
import { getHoursMinutesText } from "@/utils/getHoursMinutesText";
import { getTargetTime } from "@/utils/getTargetTime";
import { isFolder } from "@/utils/isFolder";
import { toHoursMinutesSeconds } from "@/utils/toHoursMinutesSeconds";
import { useLocalSearchParams } from "expo-router";
import { filesize } from "filesize";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useQuery } from "react-query";

interface TableRowProps {
  name: string;
  content: string;
}
const TableRow = ({ name, content }: TableRowProps) => (
  <View style={styles.tableRow}>
    <View style={styles.tableColumn}>
      <Text>{name}</Text>
    </View>
    <Text ellipsizeMode="tail" numberOfLines={1}>
      {content}
    </Text>
  </View>
);

export default function fileDetailsNew() {
  const { id } = useLocalSearchParams();
  const [image, setImage] = useState<string>("");
  const { data: files = [] } = useQuery("fetchFilesAndFolders", fetchFilesAndFolders);
  const file = searchFileById(files, +id);
  const hasThumbnail = Boolean(file?.refs.thumbnail);
  const { data: thumbnail, isFetching } = useQuery(
    "getThumbnail",
    () => fetchWithKey<Blob>(file?.refs.thumbnail ?? "", "blob"),
    { enabled: hasThumbnail },
  );

  useEffect(() => {
    if (thumbnail) {
      setImage(URL.createObjectURL(thumbnail));
    }
  }, [thumbnail]);

  if (!file) {
    return <ActivityIndicator animating={true} />;
  }

  return (
    <View style={{ padding: 2 * 8, flex: 1, display: "flex" }}>
      {hasThumbnail ? (
        isFetching || !image ? (
          <View style={[styles.image, styles.imageContainer]}>
            <ActivityIndicator />
          </View>
        ) : (
          <Image source={{ uri: image }} style={styles.image} />
        )
      ) : null}

      <View style={styles.table}>
        <TableRow name="Name:" content={file.display} />
        {file.gcodeAnalysis.estimatedPrintTime && (
          <TableRow
            name="Print time:"
            content={getHoursMinutesText(toHoursMinutesSeconds(file.gcodeAnalysis.estimatedPrintTime))}
          />
        )}
        {file.gcodeAnalysis.estimatedPrintTime && (
          <TableRow name="Done at:" content={getTargetTime(file.gcodeAnalysis.estimatedPrintTime)} />
        )}
        {file.gcodeAnalysis.layerHeight && (
          <TableRow name="Layer height:" content={file.gcodeAnalysis.layerHeight.toString() + "mm"} />
        )}
        {file.gcodeAnalysis.material && <TableRow name="Material:" content={file.gcodeAnalysis.material} />}
        <TableRow name="File size:" content={filesize(file.size, { base: 2, standard: "jedec" }).toString()} />
        <TableRow name="Date:" content={new Date(file.date * 1000).toLocaleString()} />
      </View>
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

const styles = StyleSheet.create({
  table: {
    marginVertical: 2 * 8,
    display: "flex",
    gap: 8 / 2,
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
  },
  tableColumn: {
    width: 95,
  },
  image: {
    width: 160,
    height: 120,
    alignSelf: "center",
  },
  imageContainer: {
    borderWidth: 0.5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

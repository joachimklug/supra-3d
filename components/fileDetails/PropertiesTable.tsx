import { View } from "@/components/Themed";
import { File } from "@/models/Files";
import { getHoursMinutesText } from "@/utils/getHoursMinutesText";
import { getTargetTime } from "@/utils/getTargetTime";
import { toHoursMinutesSeconds } from "@/utils/toHoursMinutesSeconds";
import { filesize } from "filesize";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

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

interface Props {
  file: File;
}

export default function PropertiesTable({ file }: Props) {
  return (
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
  );
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
});

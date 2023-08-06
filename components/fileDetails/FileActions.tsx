import { View } from "@/components/Themed";
import { File } from "@/models/Files";
import { startPrint } from "@/services/files";
import { router } from "expo-router";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

interface Props {
  file: File;
}

export default function FileActions({ file }: Props) {
  return (
    <View style={styles.container}>
      <Button icon="close" mode="outlined" onPress={() => router.back()}>
        Close
      </Button>
      <Button icon="printer-3d-nozzle-outline" mode="contained" onPress={() => startPrint(file.origin, file.path)}>
        Print
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    flexWrap: "wrap",
    gap: 2 * 8,
    marginTop: 8,
  },
});

import { Text } from "@/components";
import { Box } from "@/supra-components/Themed";
import Printer from "@/supra-components/settings/Printer";
import { StyleSheet } from "react-native";

export default function TabTwoScreen() {
  return (
    <Box style={styles.container}>
      {/* <Box style={styles.separator} /> */}
      <Printer />
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

import { StyleSheet } from "react-native";
import { Text } from "@/components";
import EditScreenInfo from "@/supra-components/EditScreenInfo";
import { Box } from "@/supra-components/Themed";

export default function TabTwoScreen() {
  return (
    <Box style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <Box style={styles.separator} />
      <EditScreenInfo path="app/(tabs)/two.tsx" />
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

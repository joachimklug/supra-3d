import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import { Text } from "@/components";
import EditScreenInfo from "@/supra-components/EditScreenInfo";
import { Box } from "@/supra-components/Themed";

export default function ModalScreen() {
  return (
    <Box style={styles.container}>
      <Text style={styles.title}>Modal</Text>
      <Box style={styles.separator} />
      <EditScreenInfo path="app/modal.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
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

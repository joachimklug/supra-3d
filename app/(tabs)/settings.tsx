import { View } from "@/components/Themed";
import Printer from "@/components/settings/Printer";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";

export default function TabTwoScreen() {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={{ display: "flex", gap: 2 * 8, width: "80%" }}>
          <Printer />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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

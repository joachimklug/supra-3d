import { AvoidKeyboard } from "@/components/AvoidKeyboard";
import { View } from "@/components/Themed";
import Printer from "@/components/settings/Printer";
import { ScrollView, StyleSheet } from "react-native";

export default function Settings() {
  return (
    <AvoidKeyboard>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={{ display: "flex", gap: 2 * 8, width: "80%" }}>
          <Printer />
        </View>
      </ScrollView>
    </AvoidKeyboard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

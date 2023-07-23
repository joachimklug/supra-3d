import EditScreenInfo from "@/components/EditScreenInfo";
import { View } from "@/components/Themed";
import { fetchSettings } from "@/services/settings";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useQuery } from "react-query";

export default function TabOneScreen() {
  const { data: prusaSettings } = useQuery("todos", fetchSettings);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      <Text>{prusaSettings?.printer.location}</Text>
    </View>
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

import EditScreenInfo from "@/components/EditScreenInfo";
import { View } from "@/components/Themed";
import { fetchPrinter } from "@/services/printer";
import { onlineState } from "@/state/onlineState";
import { StyleSheet } from "react-native";
import { Divider, Text } from "react-native-paper";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";

export default function TabOneScreen() {
  const { data: printer } = useQuery("settings", fetchPrinter, { refetchInterval: 3000 });
  const [online] = useRecoilState(onlineState);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      <Divider />
      <Text>{printer?.temperature.bed.actual}</Text>
      <Text>{printer?.temperature.bed.target}</Text>
      <Text>Online: {online ? "true" : "false"}</Text>
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

import { fetchPrinter } from "@/services/printer";
import { onlineState } from "@/state/onlineState";
import { flexRow } from "@/utils/commonStyles";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";

const dotSize = 10;

export const OnlineStatus = () => {
  const [online] = useRecoilState(onlineState);
  const { data: printer } = useQuery("settings", fetchPrinter, { enabled: false });

  return (
    <View style={[flexRow, { gap: 8, marginRight: 2 * 8 }]}>
      <View style={[styles.circle, online && !printer?.state.flags.error ? styles.online : styles.offline]}></View>
      <Text>{online ? printer?.state.text : "Offline"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: dotSize,
    height: dotSize,
    borderRadius: dotSize / 2,
  },
  online: {
    backgroundColor: "green",
  },
  offline: {
    backgroundColor: "red",
  },
});

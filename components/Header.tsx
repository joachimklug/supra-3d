import { onlineState } from "@/state/onlineState";
import { flexRow } from "@/utils/commonStyles";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useRecoilState } from "recoil";

const dotSize = 10;

export const Header = () => {
  const [online] = useRecoilState(onlineState);

  return (
    <View style={[flexRow, { gap: 8, marginRight: 2 * 8 }]}>
      <View style={[styles.circle, online ? styles.online : styles.offline]}></View>
      <Text>{online ? "Online" : "Offline"}</Text>
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

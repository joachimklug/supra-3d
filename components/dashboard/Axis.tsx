import Colors from "@/constants/Colors";
import { fetchPrinter } from "@/services/printer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleProp, TouchableOpacity, ViewStyle, useColorScheme } from "react-native";
import { Text } from "react-native-paper";
import { useQuery } from "react-query";
import { View } from "../Themed";

interface Props {
  itemStyles?: StyleProp<ViewStyle>;
  axis: "x" | "y" | "z";
}

export default function Axis({ itemStyles, axis }: Props) {
  const colorScheme = useColorScheme();
  const textColor = Colors[colorScheme ?? "light"].text;
  const { data: printer } = useQuery("fetchPrinter", fetchPrinter, { enabled: false });

  return (
    <TouchableOpacity onPress={() => console.log(printer?.telemetry[`axis_${axis}`])}>
      <View style={itemStyles}>
        <Text variant="bodyLarge">{axis}-Axis</Text>
        <MaterialCommunityIcons name={`axis-${axis}-arrow`} size={28} color={textColor} />
        <Text variant="bodyLarge">{printer?.telemetry[`axis_${axis}`] ?? "--"} mm</Text>
      </View>
    </TouchableOpacity>
  );
}

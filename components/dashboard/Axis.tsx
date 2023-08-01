import Colors from "@/constants/Colors";
import { AxisName } from "@/models/AxisName";
import { fetchPrinter } from "@/services/printer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleProp, TouchableOpacity, ViewStyle, useColorScheme } from "react-native";
import { Text } from "react-native-paper";
import { useQuery } from "react-query";
import { View } from "../Themed";
import AxisDialog from "./AxisDialog";

interface Props {
  itemStyles?: StyleProp<ViewStyle>;
  axis: AxisName;
}

export default function Axis({ itemStyles, axis }: Props) {
  const [open, setOpen] = useState(false);
  const colorScheme = useColorScheme();
  const textColor = Colors[colorScheme ?? "light"].text;
  const { data: printer } = useQuery("fetchPrinter", fetchPrinter, { enabled: false });

  return (
    <>
      <TouchableOpacity onPress={() => setOpen(true)}>
        <View style={itemStyles}>
          <Text variant="bodyLarge">{axis}-Axis</Text>
          <MaterialCommunityIcons name={`axis-${axis}-arrow`} size={28} color={textColor} />
          <Text variant="bodyLarge">{printer?.telemetry[`axis_${axis}`] ?? "--"} mm</Text>
        </View>
      </TouchableOpacity>
      <AxisDialog visible={open} hideDialog={() => setOpen(false)} axis={axis} />
    </>
  );
}

import Colors from "@/constants/Colors";
import { fetchPrinter } from "@/services/printer";
import { getTargetColor } from "@/utils/getTargetColor";
import { toDisplayValue } from "@/utils/toDisplayValue";
import { useState } from "react";
import { StyleProp, ViewStyle, useColorScheme, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { useQuery } from "react-query";
import { View } from "../Themed";
import BedDialog from "./BedDialog";

interface Props {
  itemStyles?: StyleProp<ViewStyle>;
}

export default function BedTemp({ itemStyles }: Props) {
  const [open, setOpen] = useState(false);
  const { data: printer } = useQuery("fetchPrinter", fetchPrinter, { enabled: false });
  const bedActual = toDisplayValue(printer?.temperature.bed.actual);
  const bedTarget = toDisplayValue(printer?.temperature.bed.target);
  const colorScheme = useColorScheme();

  return (
    <>
      <TouchableOpacity onPress={() => setOpen(true)}>
        <View style={itemStyles}>
          <Text variant="bodyLarge">Bed</Text>
          <Text
            variant="headlineMedium"
            style={{
              color: getTargetColor(bedActual, bedTarget, Colors[colorScheme ?? "light"].text),
              fontWeight: "bold",
            }}
          >
            {bedActual} &deg;C
          </Text>
          <Text variant="bodyLarge">set {bedTarget} &deg;C</Text>
        </View>
      </TouchableOpacity>
      <BedDialog visible={open} hideDialog={() => setOpen(false)} />
    </>
  );
}

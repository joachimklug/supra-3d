import Colors from "@/constants/Colors";
import { fetchPrinter } from "@/services/printer";
import { getTargetColor } from "@/utils/getTargetColor";
import { toDisplayValue } from "@/utils/toDisplayValue";
import { useState } from "react";
import { StyleProp, TouchableOpacity, ViewStyle, useColorScheme } from "react-native";
import { Text } from "react-native-paper";
import { useQuery } from "react-query";
import { View } from "../Themed";
import NozzleDialog from "./NozzleDialog";

interface Props {
  itemStyles?: StyleProp<ViewStyle>;
}

export default function NozzleTemp({ itemStyles }: Props) {
  const [open, setOpen] = useState(false);
  const { data: printer } = useQuery("fetchPrinter", fetchPrinter, { enabled: false });
  const nozzleActual = toDisplayValue(printer?.temperature.tool0.actual);
  const nozzleTarget = toDisplayValue(printer?.temperature.tool0.target);
  const colorScheme = useColorScheme();

  return (
    <>
      <TouchableOpacity onPress={() => setOpen(true)}>
        <View style={itemStyles}>
          <Text variant="bodyLarge">Nozzle</Text>
          <Text
            variant="headlineMedium"
            style={{
              color: getTargetColor(nozzleActual, nozzleTarget, Colors[colorScheme ?? "light"].text),
              fontWeight: "bold",
            }}
          >
            {nozzleActual} &deg;C
          </Text>
          <Text variant="bodyLarge">set {nozzleTarget} &deg;C</Text>
        </View>
      </TouchableOpacity>
      <NozzleDialog visible={open} hideDialog={() => setOpen(false)} />
    </>
  );
}

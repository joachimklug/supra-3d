import { fetchPrinter } from "@/services/printer";
import { dashboardItemIcon, dashboardItemText } from "@/utils/commonStyles";
import { getTargetColor } from "@/utils/getTargetColor";
import { toDisplayValue } from "@/utils/toDisplayValue";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleProp, ViewStyle, useColorScheme } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import { useQuery } from "react-query";
import { View } from "../Themed";
import BedDialog from "./BedDialog";
import Colors from "@/constants/Colors";

interface Props {
  itemStyles?: StyleProp<ViewStyle>;
}

export default function BedTemp({ itemStyles }: Props) {
  const [open, setOpen] = useState(false);
  const { data: printer } = useQuery("settings", fetchPrinter, { enabled: false });
  const bedActual = toDisplayValue(printer?.temperature.bed.actual);
  const bedTarget = toDisplayValue(printer?.temperature.bed.target);
  const colorScheme = useColorScheme();

  return (
    <>
      <TouchableOpacity onPress={() => setOpen(true)}>
        <View style={itemStyles}>
          <SimpleLineIcons name="wrench" color="white" style={dashboardItemIcon} />
          <Text variant="bodyLarge" style={dashboardItemText}>
            Bed
          </Text>
          <Text
            variant="headlineMedium"
            style={[
              dashboardItemText,
              { color: getTargetColor(bedActual, bedTarget, Colors[colorScheme ?? "light"].text), fontWeight: "bold" },
            ]}
          >
            {bedActual} &deg;C
          </Text>
          <Text variant="bodyLarge" style={dashboardItemText}>
            set {bedTarget} &deg;C
          </Text>
        </View>
      </TouchableOpacity>
      <BedDialog visible={open} hideDialog={() => setOpen(false)} />
    </>
  );
}

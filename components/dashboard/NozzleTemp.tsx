import { fetchPrinter } from "@/services/printer";
import { getTargetColor } from "@/utils/getTargetColor";
import { toDisplayValue } from "@/utils/toDisplayValue";
import { StyleProp, ViewStyle, useColorScheme } from "react-native";
import { Text } from "react-native-paper";
import { useQuery } from "react-query";
import { View } from "../Themed";
import { SimpleLineIcons } from "@expo/vector-icons";
import { dashboardItemIcon, dashboardItemText } from "@/utils/commonStyles";
import Colors from "@/constants/Colors";

interface Props {
  itemStyles?: StyleProp<ViewStyle>;
}

export default function NozzleTemp({ itemStyles }: Props) {
  const { data: printer } = useQuery("settings", fetchPrinter, { enabled: false });
  const nozzleActual = toDisplayValue(printer?.temperature.tool0.actual);
  const nozzleTarget = toDisplayValue(printer?.temperature.tool0.target);
  const colorScheme = useColorScheme();

  return (
    <View style={itemStyles}>
      <SimpleLineIcons name="wrench" color="white" style={dashboardItemIcon} />
      <Text variant="bodyLarge" style={dashboardItemText}>
        Nozzle
      </Text>
      <Text
        variant="headlineMedium"
        style={[
          dashboardItemText,
          {
            color: getTargetColor(nozzleActual, nozzleTarget, Colors[colorScheme ?? "light"].text),
            fontWeight: "bold",
          },
        ]}
      >
        {nozzleActual} &deg;C
      </Text>
      <Text variant="bodyLarge" style={dashboardItemText}>
        set {nozzleTarget} &deg;C
      </Text>
    </View>
  );
}

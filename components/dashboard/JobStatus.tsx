import { fetchCurrentJob } from "@/services/job";
import { flexRow } from "@/utils/commonStyles";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleProp, ViewStyle, useColorScheme } from "react-native";
import { Text } from "react-native-paper";
import { useQuery } from "react-query";
import { View } from "../Themed";
import Colors from "@/constants/Colors";
import { onlineState } from "@/state/onlineState";
import { useRecoilState } from "recoil";
import { toHoursMinutesSeconds } from "@/utils/toHoursMinutesSeconds";
import { getHoursMinutesText } from "@/utils/getHoursMinutesText";
import { getTargetTime } from "@/utils/getTargetTime";

interface Props {
  itemStyles?: StyleProp<ViewStyle>;
}

export default function JobStatus({ itemStyles }: Props) {
  const { data: job } = useQuery("fetchCurrentJob", fetchCurrentJob, { enabled: false });
  const [online] = useRecoilState(onlineState);
  const colorScheme = useColorScheme();
  const textColor = Colors[colorScheme ?? "light"].text;
  const isOperational = job?.state === "Operational";
  const showAllData = online && !isOperational;
  const printTimeLeft = job?.progress.printTimeLeft ?? 0;

  fetchCurrentJob;
  return (
    <View style={itemStyles}>
      {showAllData && (
        <View style={[flexRow, { gap: 4 }]}>
          <MaterialCommunityIcons name="arrow-right-thin" size={18} color={textColor} />
          <Text variant="bodyLarge">{getHoursMinutesText(toHoursMinutesSeconds(printTimeLeft))}</Text>
        </View>
      )}
      <Text variant="headlineMedium" style={{ fontWeight: "bold" }}>
        {!online ? "Offline" : isOperational ? "Ready" : job?.state}
      </Text>
      {showAllData && (
        <View style={[flexRow, { gap: 8 }]}>
          <Feather name="clock" size={18} color={textColor} />
          <Text variant="bodyLarge">{getTargetTime(printTimeLeft)}</Text>
        </View>
      )}
    </View>
  );
}

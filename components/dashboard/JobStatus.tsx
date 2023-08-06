import Colors from "@/constants/Colors";
import { fetchCurrentJob } from "@/services/job";
import { fetchPrinter } from "@/services/printer";
import { onlineState } from "@/state/onlineState";
import { flexRow } from "@/utils/commonStyles";
import { getHoursMinutesText } from "@/utils/getHoursMinutesText";
import { getTargetTime } from "@/utils/getTargetTime";
import { toHoursMinutesSeconds } from "@/utils/toHoursMinutesSeconds";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleProp, TouchableOpacity, ViewStyle, useColorScheme } from "react-native";
import { Text } from "react-native-paper";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { View } from "../Themed";
import JobDialog from "./JobDialog";

interface Props {
  itemStyles?: StyleProp<ViewStyle>;
}

export default function JobStatus({ itemStyles }: Props) {
  const [open, setOpen] = useState(false);
  const { data: job } = useQuery("fetchCurrentJob", fetchCurrentJob, { enabled: false });
  const { data: printer } = useQuery("fetchPrinter", fetchPrinter, { enabled: false });
  const [online] = useRecoilState(onlineState);
  const colorScheme = useColorScheme();
  const textColor = Colors[colorScheme ?? "light"].text;
  const isOperational = printer?.state.text === "Operational";
  const showAllData = printer?.state.flags.printing;
  const printTimeLeft = job?.progress.printTimeLeft ?? 0;

  return (
    <>
      <TouchableOpacity onPress={() => setOpen(true)} style={{ flex: 1 }}>
        <View style={itemStyles}>
          {showAllData && (
            <View style={[flexRow, { gap: 4 }]}>
              <MaterialCommunityIcons name="arrow-right-thin" size={18} color={textColor} />
              <Text variant="bodyLarge">{getHoursMinutesText(toHoursMinutesSeconds(printTimeLeft))}</Text>
            </View>
          )}
          <Text variant="headlineMedium" style={{ fontWeight: "bold" }}>
            {!online || !printer ? "Offline" : isOperational ? "Ready" : printer.state.text}
          </Text>
          {showAllData && (
            <View style={[flexRow, { gap: 8 }]}>
              <Feather name="clock" size={18} color={textColor} />
              <Text variant="bodyLarge">{getTargetTime(printTimeLeft)}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
      <JobDialog visible={open} hideDialog={() => setOpen(false)} />
    </>
  );
}

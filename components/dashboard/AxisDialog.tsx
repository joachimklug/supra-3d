import Colors from "@/constants/Colors";
import { AxisName } from "@/models/AxisName";
import { disableSteppers, fetchPrinter, moveAxis } from "@/services/printer";
import { flexRow } from "@/utils/commonStyles";
import { getValidAxisName } from "@/utils/getValidAxisName";
import { useState } from "react";
import { Text, useColorScheme } from "react-native";
import { Dialog, IconButton, Portal, SegmentedButtons } from "react-native-paper";
import { useQuery } from "react-query";

interface Props {
  visible: boolean;
  hideDialog: () => void;
  axis: AxisName;
}

export default function AxisDialog({ visible, hideDialog, axis }: Props) {
  const { data: printer } = useQuery("fetchPrinter", fetchPrinter, { enabled: false });
  const [stepSize, setStepSize] = useState("1");
  const [selectedAxis, setSelectedAxis] = useState<AxisName>(axis);
  const colorScheme = useColorScheme();

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={() => {
          disableSteppers();
          hideDialog();
        }}
      >
        <Dialog.Title>Axis controls</Dialog.Title>
        <Dialog.Content>
          <SegmentedButtons
            value={selectedAxis}
            onValueChange={(value) => setSelectedAxis(getValidAxisName(value))}
            buttons={[
              { value: "x", label: "x" },
              { value: "y", label: "y" },
              { value: "z", label: "z" },
            ]}
          />
          <SegmentedButtons
            value={stepSize}
            onValueChange={setStepSize}
            buttons={[
              { value: "1", label: "1 mm" },
              { value: "10", label: "10 mm" },
              { value: "100", label: "100 mm" },
            ]}
            style={{ marginTop: 2 * 8 }}
          />
        </Dialog.Content>
        <Dialog.Actions style={[flexRow, { justifyContent: "center" }]}>
          <IconButton icon="minus" onPress={() => moveAxis(selectedAxis, -stepSize)} />
          <Text style={{ width: 100, textAlign: "center", color: Colors[colorScheme ?? "light"].text }}>
            {printer?.telemetry[`axis_${selectedAxis}`] ?? "--"} mm
          </Text>
          <IconButton icon="plus" onPress={() => moveAxis(selectedAxis, +stepSize)} />
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

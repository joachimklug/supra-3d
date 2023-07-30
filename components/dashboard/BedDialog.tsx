import { fetchPrinter, setBedTemperature } from "@/services/printer";
import { flexRow } from "@/utils/commonStyles";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Chip, Dialog, Portal, TextInput } from "react-native-paper";
import { useQuery } from "react-query";
import { AvoidKeyboard } from "../AvoidKeyboard";
import { DismissKeyboard } from "../DismissKeyboard";

interface PreSet {
  target: number;
  type: string;
}

const preSets: PreSet[] = [
  { target: 0, type: "OFF" },
  { target: 60, type: "PLA" },
  { target: 85, type: "PETG" },
];

const minBed = 0;
const maxBed = 110;

interface Props {
  visible: boolean;
  hideDialog: () => void;
}

export default function BedDialog({ visible, hideDialog }: Props) {
  const { data: printer } = useQuery("settings", fetchPrinter, { enabled: false });
  const currentTarget = printer?.temperature.bed.target ?? 0;
  const [bedTarget, setBedTarget] = useState(currentTarget.toString());

  useEffect(() => {
    if (visible) {
      setBedTarget(currentTarget.toString());
    }
  }, [visible]);

  const setTemperature = (value: string) => {
    const newTemp = parseInt(value);
    if (newTemp >= minBed && newTemp <= maxBed) {
      setBedTarget(newTemp.toString());
    } else {
      setBedTarget(currentTarget.toString());
    }
  };

  const applyTemperature = useCallback((target: number) => {
    setBedTemperature(target);
    hideDialog();
  }, []);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <DismissKeyboard>
          <View>
            <Dialog.Title>Bed temperature &deg;C</Dialog.Title>
            <Dialog.Content>
              <View style={flexRow}>
                <AvoidKeyboard>
                  <TextInput
                    mode="outlined"
                    keyboardType="number-pad"
                    onChangeText={setBedTarget}
                    onBlur={(e) => setTemperature(e.nativeEvent.text)}
                    value={bedTarget}
                  />
                </AvoidKeyboard>
                <Button mode="text" onPress={() => setTemperature((parseInt(bedTarget) - 1).toString())}>
                  -
                </Button>
                <Button mode="text" onPress={() => setTemperature((parseInt(bedTarget) + 1).toString())}>
                  +
                </Button>
              </View>
              <View style={[flexRow, { gap: 8, paddingTop: 2 * 8, flexWrap: "wrap" }]}>
                {preSets.map(({ target, type }) => (
                  <Chip key={type} mode="outlined" onPress={() => applyTemperature(target)}>
                    {`${type}: ${target}`}
                  </Chip>
                ))}
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Cancel</Button>
              <Button onPress={() => applyTemperature(parseInt(bedTarget))}>Set</Button>
            </Dialog.Actions>
          </View>
        </DismissKeyboard>
      </Dialog>
    </Portal>
  );
}

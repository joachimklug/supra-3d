import { fetchPrinter, setNozzleTemperature } from "@/services/printer";
import { flexRow } from "@/utils/commonStyles";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Chip, Dialog, Portal, TextInput } from "react-native-paper";
import { useQuery } from "react-query";
import { AvoidKeyboard } from "../AvoidKeyboard";
import { DismissKeyboard } from "../DismissKeyboard";
import { TempPreSet } from "@/models/TempPreSet";

const preSets: TempPreSet[] = [
  { target: 0, name: "OFF" },
  { target: 215, name: "PLA" },
  { target: 240, name: "PETG" },
];

const minNozzle = 0;
const maxNozzle = 300;

interface Props {
  visible: boolean;
  hideDialog: () => void;
}

export default function NozzleDialog({ visible, hideDialog }: Props) {
  const { data: printer } = useQuery("fetchPrinter", fetchPrinter, { enabled: false });
  const currentTarget = printer?.temperature.tool0.target ?? 0;
  const [nozzleTarget, setNozzleTarget] = useState(currentTarget.toString());

  useEffect(() => {
    if (visible) {
      setNozzleTarget(currentTarget.toString());
    }
  }, [visible]);

  const setTemperature = (value: string) => {
    const newTemp = parseInt(value);
    if (newTemp >= minNozzle && newTemp <= maxNozzle) {
      setNozzleTarget(newTemp.toString());
    } else {
      setNozzleTarget(currentTarget.toString());
    }
  };

  const applyTemperature = useCallback((target: number) => {
    setNozzleTemperature(target);
    hideDialog();
  }, []);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <DismissKeyboard>
          <View>
            <Dialog.Title>Nozzle temperature &deg;C</Dialog.Title>
            <Dialog.Content>
              <View style={flexRow}>
                <AvoidKeyboard>
                  <TextInput
                    mode="outlined"
                    keyboardType="number-pad"
                    onChangeText={setNozzleTarget}
                    onBlur={(e) => setTemperature(e.nativeEvent.text)}
                    value={nozzleTarget}
                  />
                </AvoidKeyboard>
                <Button mode="text" onPress={() => setTemperature((parseInt(nozzleTarget) - 1).toString())}>
                  -
                </Button>
                <Button mode="text" onPress={() => setTemperature((parseInt(nozzleTarget) + 1).toString())}>
                  +
                </Button>
              </View>
              <View style={[flexRow, { gap: 8, paddingTop: 2 * 8, flexWrap: "wrap" }]}>
                {preSets.map(({ target, name }) => (
                  <Chip key={name} mode="outlined" onPress={() => applyTemperature(target)}>
                    {`${name}: ${target}`}
                  </Chip>
                ))}
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Cancel</Button>
              <Button onPress={() => applyTemperature(parseInt(nozzleTarget))}>Set</Button>
            </Dialog.Actions>
          </View>
        </DismissKeyboard>
      </Dialog>
    </Portal>
  );
}

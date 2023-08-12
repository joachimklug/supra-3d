import { useSettings } from "@/hooks/useSettings";
import { UUID } from "@/models/UUID";
import { flexRow } from "@/utils/commonStyles";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { Chip, List } from "react-native-paper";
import PrinterDialog from "./PrinterDialog";
import { sortByName } from "@/utils/sortByName";

export default function Printer() {
  const [open, setOpen] = useState(false);
  const { settings, updateSettings, updatePrinter } = useSettings();
  const [printerId, setPrinterId] = useState<UUID>();

  return (
    <>
      {[...settings.printers]
        .sort((item1, item2) => sortByName(item1.name, item2.name))
        .map((printer) => {
          const isSelected = printer.id === settings.selectedPrinter;
          return (
            <List.Item
              key={printer.name}
              title={printer.name}
              onPress={() => {
                setPrinterId(printer.id);
                setOpen(true);
              }}
              right={(props) => (
                <View style={flexRow}>
                  <Chip
                    compact
                    style={{ marginLeft: 8 }}
                    mode="outlined"
                    onPress={(event) => {
                      event.stopPropagation();
                      updateSettings({ selectedPrinter: printer.id });
                    }}
                    selected={isSelected}
                  >
                    {isSelected ? "selected" : "inactive"}
                  </Chip>
                  <Pressable
                    onPress={() => updatePrinter([...settings.printers].filter(({ id }) => id !== printer.id))}
                  >
                    <List.Icon {...props} icon="trash-can-outline" />
                  </Pressable>
                </View>
              )}
            />
          );
        })}
      <List.Item
        title="Add Printer"
        left={(props) => <List.Icon {...props} icon="plus" />}
        onPress={() => {
          setPrinterId(undefined);
          setOpen(true);
        }}
      />
      <PrinterDialog
        visible={open}
        hideDialog={() => {
          setOpen(false);
          setPrinterId(undefined);
        }}
        printerId={printerId}
      />
    </>
  );
}

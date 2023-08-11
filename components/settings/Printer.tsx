import { useSettings } from "@/hooks/useSettings";
import { useState } from "react";
import { Pressable } from "react-native";
import { List } from "react-native-paper";
import PrinterDialog from "./PrinterDialog";
import { storeSettings } from "@/storage/settings";
import { PrinterSettings } from "@/models/AppSettings";

export default function Printer() {
  const [open, setOpen] = useState(false);
  const { settings, refreshSettings } = useSettings();
  const [printer, setPrinter] = useState<PrinterSettings>();

  return (
    <>
      {settings?.printer.map((printer) => (
        <List.Item
          key={printer.name}
          title={printer.name}
          onPress={() => {
            setPrinter(printer);
            setOpen(true);
          }}
          right={(props) => (
            <Pressable
              onPress={async () => {
                await storeSettings({ printer: [] });
                setPrinter(undefined);
                refreshSettings();
              }}
            >
              <List.Icon {...props} icon="trash-can-outline" />
            </Pressable>
          )}
        />
      ))}
      {!settings?.printer.length && (
        <List.Item
          title="Add Printer"
          left={(props) => <List.Icon {...props} icon="plus" />}
          onPress={() => setOpen(true)}
        />
      )}
      <PrinterDialog
        visible={open}
        hideDialog={() => {
          setOpen(false);
          refreshSettings();
        }}
        printer={printer}
      />
    </>
  );
}

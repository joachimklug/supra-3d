import { useSettings } from "@/hooks/useSettings";
import { UUID } from "@/models/UUID";
import { prependHttp } from "@/utils/prependHttp";
import { useEffect, useState } from "react";
import "react-native-get-random-values";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { v4 as uuidv4 } from "uuid";
import { AvoidKeyboard } from "../AvoidKeyboard";

interface Props {
  visible: boolean;
  hideDialog: () => void;
  printerId?: UUID;
}

export default function PrinterDialog({ visible, hideDialog, printerId }: Props) {
  const [name, setName] = useState("");
  const [hostname, setHostname] = useState("");
  const [apiKey, setApiKey] = useState("");
  const { settings, updatePrinter } = useSettings();

  useEffect(() => {
    if (!visible) {
      return;
    }
    if (!printerId) {
      setName("");
      setHostname("");
      setApiKey("");
      return;
    }
    const printer = settings.printers.find(({ id }) => id === printerId);
    if (printer) {
      setName(printer.name);
      setHostname(printer.hostname);
      setApiKey(printer.apiKey);
    }
  }, [printerId, visible]);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Add Printer</Dialog.Title>
        <Dialog.Content>
          <AvoidKeyboard>
            <TextInput label="Name" mode="outlined" value={name} onChangeText={setName} placeholder="Printer 1" />
            <TextInput
              label="Hostname"
              mode="outlined"
              value={hostname}
              onChangeText={setHostname}
              placeholder="192.168.178.22"
            />
            <TextInput label="API Key" mode="outlined" value={apiKey} onChangeText={setApiKey} />
          </AvoidKeyboard>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={async () => {
              if (!printerId) {
                await updatePrinter([
                  ...settings.printers,
                  { id: uuidv4(), name, hostname: prependHttp(hostname), apiKey },
                ]);
              } else {
                await updatePrinter(
                  [...settings.printers].map((printer) =>
                    printer.id === printerId
                      ? { id: printer.id, name, hostname: prependHttp(hostname), apiKey }
                      : printer,
                  ),
                );
              }
              hideDialog();
            }}
          >
            Save
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

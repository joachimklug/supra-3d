import { storeSettings } from "@/storage/settings";
import { useEffect, useState } from "react";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { AvoidKeyboard } from "../AvoidKeyboard";
import { PrinterSettings } from "@/models/AppSettings";
import { prependHttp } from "@/utils/prependHttp";

interface Props {
  visible: boolean;
  hideDialog: () => void;
  printer?: PrinterSettings;
}

export default function PrinterDialog({ visible, hideDialog, printer }: Props) {
  const [name, setName] = useState("");
  const [hostname, setHostname] = useState("");
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    setName(printer?.name ?? "");
    setHostname(printer?.hostname ?? "");
    setApiKey(printer?.apiKey ?? "");
  }, [JSON.stringify(printer)]);

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
                  await storeSettings({ printer: [{ name, hostname: prependHttp(hostname), apiKey }] });
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

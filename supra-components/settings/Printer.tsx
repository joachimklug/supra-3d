import { Button, DownloadIcon, FormControl, Input } from "@/components";
import { getSettings, storeSettings } from "@/storage/settings";
import { useEffect, useState } from "react";
import { Box } from "../Themed";

export default function Printer() {
  const [hostname, setHostname] = useState("");
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    (async () => {
      const currentSettings = await getSettings();
      if (!currentSettings) {
        return;
      }
      setHostname(currentSettings?.hostname);
      setApiKey(currentSettings?.apiKey);
    })();
  }, []);

  return (
    <Box>
      <FormControl size="md">
        <FormControl.Label mb="$1">
          <FormControl.Label.Text>Hostname</FormControl.Label.Text>
        </FormControl.Label>
        <Input>
          <Input.Input type="text" value={hostname} onChange={(e) => setHostname(e.nativeEvent.text)} />
        </Input>
        <FormControl.Helper>
          <FormControl.Helper.Text>Hostname or IP address</FormControl.Helper.Text>
        </FormControl.Helper>
      </FormControl>
      <FormControl size="md" mt="$4">
        <FormControl.Label mb="$1">
          <FormControl.Label.Text>API Key</FormControl.Label.Text>
        </FormControl.Label>
        <Input>
          <Input.Input type="text" value={apiKey} onChange={(e) => setApiKey(e.nativeEvent.text)} />
        </Input>
        <FormControl.Helper>
          <FormControl.Helper.Text>API key can be found in Prusa connect under settings</FormControl.Helper.Text>
        </FormControl.Helper>
      </FormControl>
      <Button mt="$4" variant="outline" onPress={() => storeSettings({ hostname, apiKey })}>
        <Button.Text>Save </Button.Text>
        <Button.Icon as={DownloadIcon} />
      </Button>
    </Box>
  );
}

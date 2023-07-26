import { getSettings, storeSettings } from "@/storage/settings";
import { prependHttp } from "@/utils/prependHttp";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Keyboard } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { View } from "../Themed";

export default function Printer() {
  const [hostname, setHostname] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [saved, setSaved] = useState(false);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const currentSettings = await getSettings();
        if (!currentSettings) {
          return;
        }
        setHostname(currentSettings.hostname);
        setApiKey(currentSettings.apiKey);
      })();
      return () => setSaved(false);
    }, []),
  );

  return (
    <>
      <View>
        <TextInput
          label="Hostname"
          mode="outlined"
          value={hostname}
          onChangeText={(text) => setHostname(text)}
          placeholder="192.168.178.22"
        />
      </View>
      <TextInput label="API Key" mode="outlined" value={apiKey} onChangeText={(text) => setApiKey(text)} />
      <Button
        icon="content-save"
        mode="contained"
        onPress={() => {
          storeSettings({ hostname: prependHttp(hostname), apiKey });
          Keyboard.dismiss();
          setSaved(true);
        }}
        buttonColor={saved ? "hsl(123, 46%, 34%)" : undefined}
        textColor={saved ? "hsl(123, 49%, 94%)" : undefined}
      >
        {saved ? "Saved" : "Save"}
      </Button>
    </>
  );
}

import { getSettings, storeSettings } from "@/storage/settings";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Keyboard } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { MonoText } from "../StyledText";
import { View } from "../Themed";

export default function Printer() {
  const [hostname, setHostname] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [showHostnameHint, setShowHostnameHint] = useState(false);
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
          right={<TextInput.Icon icon="information-outline" onPress={() => setShowHostnameHint(!showHostnameHint)} />}
        />
        {showHostnameHint && (
          <Text variant="bodyMedium">
            Hostname should be provided including protocol (http://) and can be either an IP or hostname.{" "}
            <MonoText>http://192.168.178.22</MonoText>
          </Text>
        )}
      </View>
      <TextInput label="API Key" mode="outlined" value={apiKey} onChangeText={(text) => setApiKey(text)} />
      <Button
        icon="content-save"
        mode="contained"
        onPress={() => {
          storeSettings({ hostname, apiKey });
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

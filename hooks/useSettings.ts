import { AppSettings } from "@/models/AppSettings";
import { getSettings } from "@/storage/settings";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export const useSettings = () => {
  const [settings, setSettings] = useState<AppSettings>();

  const refreshSettings = useCallback(async () => setSettings(await getSettings()), []);

  useFocusEffect(
    useCallback(() => {
      refreshSettings();
    }, []),
  );

  return { settings, refreshSettings };
};

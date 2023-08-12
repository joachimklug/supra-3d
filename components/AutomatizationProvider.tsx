import { useIsOnline } from "@/hooks/useIsOnline";
import { useSettings } from "@/hooks/useSettings";
import { fetchCurrentJob } from "@/services/job";
import { fetchPrinter } from "@/services/printer";
import { onlineState } from "@/state/onlineState";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PropsWithChildren, useEffect } from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";

export const AutomatizationProvider = ({ children }: PropsWithChildren) => {
  const [online] = useRecoilState(onlineState);
  const { settings, updateSettings } = useSettings();
  const periodicFetchEnabled = Boolean(settings.selectedPrinter);
  useQuery("fetchPrinter", fetchPrinter, { refetchInterval: 3_000, enabled: periodicFetchEnabled });
  useQuery("fetchCurrentJob", fetchCurrentJob, {
    refetchInterval: online ? 3_000 : 60_000,
    enabled: periodicFetchEnabled,
  });

  useIsOnline();

  useEffect(() => {
    (async () => await updateSettings({}))();
    if (process.env.EXPO_PUBLIC_CLEAR_STORAGE_ON_STARTUP) {
      AsyncStorage.clear();
    }
  }, []);

  return children;
};

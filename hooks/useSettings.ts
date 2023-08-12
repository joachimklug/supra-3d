import { AppSettings, PrinterSettings } from "@/models/AppSettings";
import { settingsState } from "@/state/settingsState";
import { getSettings, storeSettings } from "@/storage/settings";
import { useRecoilState } from "recoil";

export const useSettings = () => {
  const [settings, setSettings] = useRecoilState(settingsState);

  const updateSettings = async (newSettings: Partial<AppSettings>) => {
    await storeSettings(newSettings);
    setSettings(await getSettings());
  };

  const updatePrinter = async (newPrinter: PrinterSettings[]) => {
    await updateSettings({ printers: newPrinter });
    if (newPrinter.some((printer) => printer.id === settings.selectedPrinter)) {
      return;
    }
    await updateSettings({ selectedPrinter: newPrinter.length ? newPrinter[0].id : undefined });
  };

  return { settings, updateSettings, updatePrinter };
};

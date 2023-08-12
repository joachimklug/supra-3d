import { AppSettings } from "@/models/AppSettings";
import AsyncStorage from "@react-native-async-storage/async-storage";

const key = "settings";

export const emptySettings: AppSettings = {
  printers: [],
  selectedPrinter: undefined,
};

export const storeSettings = async (newSettings: Partial<AppSettings>) => {
  try {
    const currentSettings = await getSettings();
    await AsyncStorage.setItem(key, JSON.stringify({ ...currentSettings, ...newSettings }));
  } catch (e) {
    console.error(`Not able to store ${key}`);
  }
};

export const getSettings = async (): Promise<AppSettings> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : emptySettings;
  } catch (e) {
    console.error(`Not able to load ${key}`, e);
    return emptySettings;
  }
};

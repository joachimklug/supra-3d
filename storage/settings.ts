import { Settings } from "@/models/Settings";
import AsyncStorage from "@react-native-async-storage/async-storage";

const key = "settings";

export const storeSettings = async (newSettings: Partial<Settings>) => {
  try {
    const currentSettings = await getSettings();
    await AsyncStorage.setItem(key, JSON.stringify({ ...currentSettings, ...newSettings }));
  } catch (e) {
    console.error(`Not able to store ${key}`);
  }
};

export const getSettings = async (): Promise<Settings | undefined> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(`Not able to load ${key}`, e);
  }
};

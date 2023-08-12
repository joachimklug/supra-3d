import { emptySettings } from "@/storage/settings";
import { atom } from "recoil";

export const settingsState = atom({
  key: "settingsState",
  default: emptySettings,
});

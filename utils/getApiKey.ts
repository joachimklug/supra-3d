import { getSettings } from "@/storage/settings";

export const getApiKey = async (): Promise<string> => {
  const settings = await getSettings();
  return settings.printer[0]?.apiKey ?? "";
};

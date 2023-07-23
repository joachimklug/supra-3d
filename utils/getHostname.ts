import { getSettings } from "@/storage/settings";

export const getHostname = async (): Promise<string> => {
  const proxy = process.env.EXPO_PUBLIC_PROXY_URL;
  if (proxy) {
    return proxy;
  }
  return (await getSettings())?.hostname ?? "";
};

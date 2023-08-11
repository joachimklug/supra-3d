import { getSettings } from "@/storage/settings";

export const getApiKey = async (): Promise<string> => (await getSettings()).printer.at(0)?.apiKey ?? "";

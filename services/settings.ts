import { PrusaSettings } from "@/models/PrusaSettings";
import { getSettings } from "@/storage/settings";
import { getHostname } from "@/utils/getHostname";

export const fetchSettings = async (): Promise<PrusaSettings> => {
  const apiKey = (await getSettings()).apiKey;
  const response = await fetch(`${await getHostname()}/api/settings`, {
    method: "GET",
    headers: {
      "X-API-Key": apiKey,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

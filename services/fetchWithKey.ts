import { getSettings } from "@/storage/settings";
import { getHostname } from "@/utils/getHostname";

export async function fetchWithKey<T>(url: string): Promise<T> {
  const apiKey = (await getSettings()).apiKey;
  const response = await fetch(`${await getHostname()}${url}`, {
    method: "GET",
    headers: {
      "X-API-Key": apiKey,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

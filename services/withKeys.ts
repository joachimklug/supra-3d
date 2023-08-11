import { getApiKey } from "@/utils/getApiKey";
import { getHostname } from "@/utils/getHostname";

export async function fetchWithKey<T>(url: string, type: "json" | "blob" = "json"): Promise<T> {
  const apiKey = await getApiKey();
  const hostname = await getHostname();
  const response = await fetch(`${hostname}${url}`, {
    method: "GET",
    headers: {
      "X-API-Key": apiKey,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return type === "json" ? response.json() : response.blob();
}

export async function deleteWithKey(url: string): Promise<number> {
  const apiKey = await getApiKey();
  const hostname = await getHostname();
  const response = await fetch(`${hostname}${url}`, {
    method: "DELETE",
    headers: {
      "X-API-Key": apiKey,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.status;
}

export async function postWithKey<T>(url: string, data: T): Promise<number> {
  const apiKey = await getApiKey();
  const hostname = await getHostname();
  const response = await fetch(`${hostname}${url}`, {
    method: "POST",
    headers: {
      "X-API-Key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.status;
}

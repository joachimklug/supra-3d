import { getActivePrinter } from "@/utils/getActivePrinter";

export async function fetchWithKey<T>(url: string, type: "json" | "blob" = "json"): Promise<T> {
  const printer = await getActivePrinter();
  if (!printer) {
    return Promise.reject("No printer selected");
  }
  const response = await fetch(`${printer.hostname}${url}`, {
    method: "GET",
    headers: {
      "X-API-Key": printer.apiKey,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return type === "json" ? response.json() : response.blob();
}

export async function deleteWithKey(url: string): Promise<number> {
  const printer = await getActivePrinter();
  if (!printer) {
    return Promise.reject("No printer selected");
  }
  const response = await fetch(`${printer.hostname}${url}`, {
    method: "DELETE",
    headers: {
      "X-API-Key": printer.apiKey,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.status;
}

export async function postWithKey<T>(url: string, data: T): Promise<number> {
  const printer = await getActivePrinter();
  if (!printer) {
    return Promise.reject("No printer selected");
  }
  const response = await fetch(`${printer.hostname}${url}`, {
    method: "POST",
    headers: {
      "X-API-Key": printer.apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.status;
}

import { PrusaSettings } from "@/models/PrusaSettings";
import { getHostname } from "@/utils/getHostname";

export const fetchSettings = async (): Promise<PrusaSettings> => {
  const response = await fetch(`${await getHostname()}/api/settings`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": "XcthUQ_wDnMc2Q",
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

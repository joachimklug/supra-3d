import { PrusaSettings } from "@/models/PrusaSettings";
import { fetchWithKey } from "./fetchWithKey";

export const fetchSettings = async () => fetchWithKey<PrusaSettings>("/api/settings");

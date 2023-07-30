import { PrusaSettings } from "@/models/PrusaSettings";
import { fetchWithKey } from "./withKeys";

export const fetchSettings = async () => fetchWithKey<PrusaSettings>("/api/settings");

import { PrusaSettings } from "@/models/PrusaSettings";
import { fetchWithKey } from "./withKeys";

export const fetchSettings = async () => await fetchWithKey<PrusaSettings>("/api/settings");

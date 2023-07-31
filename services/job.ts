import { CurrentJob } from "@/models/CurrentJob";
import { fetchWithKey } from "./withKeys";

export const fetchCurrentJob = async () => await fetchWithKey<CurrentJob>("/api/job");

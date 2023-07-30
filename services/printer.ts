import { Printer } from "@/models/Printer";
import { fetchWithKey, postWithKey } from "./withKeys";

export const fetchPrinter = async () => fetchWithKey<Printer>("/api/printer");

interface SetBedTemperature {
  command: "target";
  target: number;
}

export const setBedTemperature = async (target: number) =>
  postWithKey<SetBedTemperature>("/api/printer/bed", { command: "target", target });

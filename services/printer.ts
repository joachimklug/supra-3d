import { Printer } from "@/models/Printer";
import { fetchWithKey, postWithKey } from "./withKeys";

export const fetchPrinter = async () => await fetchWithKey<Printer>("/api/printer");

interface SetBedTemperature {
  command: "target";
  target: number;
}

export const setBedTemperature = async (temperature: number) =>
  await postWithKey<SetBedTemperature>("/api/printer/bed", { command: "target", target: temperature });

export const setNozzleTemperature = async (temperature: number) =>
  await postWithKey("/api/printer/tool", {
    command: "target",
    targets: {
      tool0: temperature,
    },
  });

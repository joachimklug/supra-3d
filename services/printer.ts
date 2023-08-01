import { Printer } from "@/models/Printer";
import { fetchWithKey, postWithKey } from "./withKeys";
import { AxisName } from "@/models/AxisName";

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

export const moveAxis = async (axis: AxisName, relativeMovement: number) =>
  await postWithKey("/api/printer/printhead", { command: "jog", [axis]: relativeMovement });

export const disableSteppers = async () => await postWithKey("/api/printer/printhead", { command: "disable_steppers" });

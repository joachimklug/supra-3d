import { ColorValue } from "react-native";

const rangePercentage = 0.02;

export const getTargetColor = (actual: number, target: number, defaultColor: ColorValue) => {
  if (target === 0) {
    return defaultColor;
  }
  if (actual >= target - target * rangePercentage && actual <= target + target * rangePercentage) {
    return "green";
  }
  return "red";
};

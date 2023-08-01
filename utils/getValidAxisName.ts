import { AxisName } from "@/models/AxisName";

export const getValidAxisName = (axis: string): AxisName => (["x", "y", "z"].includes(axis) ? (axis as AxisName) : "x");

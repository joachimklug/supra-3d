import { HMS } from "@/models/Time";

export const toHoursMinutesSeconds = (totalSeconds: number): HMS => {
  const totalMinutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return { hours, minutes, seconds };
};

import { HMS } from "@/models/Time";

export const getHoursMinutesText = ({ hours, minutes }: HMS) =>
  (hours ? `${hours}h ` : "") + minutes.toString().padStart(hours ? 2 : 1, "0") + "min";

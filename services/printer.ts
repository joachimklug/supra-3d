import { Printer } from "@/models/Printer";
import { fetchWithKey } from "./fetchWithKey";

export const fetchPrinter = async () => fetchWithKey<Printer>("/api/printer");

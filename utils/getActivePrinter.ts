import { PrinterSettings } from "@/models/AppSettings";
import { getSettings } from "@/storage/settings";

export const getActivePrinter = async (): Promise<PrinterSettings | undefined> => {
  const proxy = process.env.EXPO_PUBLIC_PROXY_URL;
  const { selectedPrinter, printers: printer2 } = await getSettings();
  const printer = printer2.find((printer) => printer.id === selectedPrinter);
  return printer ? { ...printer, ...(proxy && { hostname: proxy }) } : undefined;
};

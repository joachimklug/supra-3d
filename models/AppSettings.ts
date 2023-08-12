import { UUID } from "./UUID";

export interface AppSettings {
  printers: PrinterSettings[];
  selectedPrinter: UUID | undefined;
}

export interface PrinterSettings {
  id: string;
  name: string;
  hostname: string;
  apiKey: string;
}

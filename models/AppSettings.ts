export interface AppSettings {
  printer: PrinterSettings[];
}

export interface PrinterSettings {
  name: string;
  hostname: string;
  apiKey: string;
}

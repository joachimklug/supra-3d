export interface PrusaSettings {
  "api-key": string;
  username: string;
  printer: Printer;
}

interface Printer {
  name: string;
  location: string;
  farm_mode: boolean;
  network_error_chime: boolean;
}

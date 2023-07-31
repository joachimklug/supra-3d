export interface CurrentJob {
  job: Job;
  progress: Progress;
  state: string;
}

interface Job {
  estimatedPrintTime: number;
  averagePrintTime: null;
  lastPrintTime: null;
  filament: null;
  file: File;
  user: string;
}

interface File {
  name: string;
  path: string;
  size: number;
  origin: string;
  date: number;
  display: string;
}

interface Progress {
  completion: number;
  filepos: number;
  printTime: number;
  printTimeLeft: number;
  printTimeLeftOrigin: string;
  pos_z_mm: number;
  printSpeed: number;
  flow_factor: number;
}

export interface Printer {
  temperature: Temperature;
  sd: SD;
  state: State;
  telemetry: Telemetry;
  storage: Storage;
}

interface SD {
  ready: boolean;
}

interface State {
  text: string;
  flags: Flags;
}

interface Flags {
  operational: boolean;
  paused: boolean;
  printing: boolean;
  cancelling: boolean;
  pausing: boolean;
  sdReady: boolean;
  error: boolean;
  ready: boolean;
  closedOrError: boolean;
  finished: boolean;
  prepared: boolean;
  link_state: string;
}

interface Storage {
  local: Local;
  sd_card: null;
}

interface Local {
  free_space: number;
  total_space: number;
}

interface Telemetry {
  "temp-bed": number;
  "temp-nozzle": number;
  material: string;
  "z-height": number;
  "print-speed": number;
  axis_x: number;
  axis_y: number;
  axis_z: number;
}

interface Temperature {
  tool0: Bed;
  bed: Bed;
}

interface Bed {
  actual: number;
  target: number;
}

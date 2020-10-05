export interface ProvidedValues {
  random: number;
  array: any[];
}

export interface Positions {
  [id: number]: number
}

export interface SchedulerConfig {
  scheduler: string;
  duration?: number;
  numEmissions?: number;
  tickSpeed?: number;
}

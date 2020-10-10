import { SchedulingPriority } from '@rx-angular/template';


export interface TestItem {
  id: number;
  value: number;
}

export interface ProvidedValues {
  random: number;
  array: TestItem[];
}

/**
 * id: newIndex
 */
export interface Positions {
  [id: number]: number
}

export interface SchedulerConfig {
  scheduler: SchedulingPriority;
  duration?: number;
  numEmissions?: number;
  tickSpeed?: number|number[];
}

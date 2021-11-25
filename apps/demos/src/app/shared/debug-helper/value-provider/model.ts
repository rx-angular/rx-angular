export enum SchedulingPriority {
  sync,
  animationFrame,
  Promise,
  setTimeout,
  setInterval,
  postMessage,
  idleCallback,
  userBlocking,
  userVisible,
  background
}


export interface TestItem {
  id: number;
  value: number;
  array?: TestItem[];
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

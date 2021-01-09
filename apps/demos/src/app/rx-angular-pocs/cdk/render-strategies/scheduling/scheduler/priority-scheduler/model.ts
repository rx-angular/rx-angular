export interface PrioritySchedulingOptions<P> {
  priority?: P
}

export interface DefaultSchedulingOptions {
  delay: number;
}

export interface CoalescingSchedulingOptions {
  scope: any;
}

export type PrioritySchedulerOptions<P> = PrioritySchedulingOptions<P> &
  DefaultSchedulingOptions;

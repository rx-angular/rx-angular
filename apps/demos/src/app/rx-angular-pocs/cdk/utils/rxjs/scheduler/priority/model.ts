export interface PrioritySchedulingOptions<P> {
  priority?: P
}

export interface DefaultSchedulingOptions {
  delay: number;
  context: any;
}

export type RxaSchedulingOptions<P> = PrioritySchedulingOptions<P> & DefaultSchedulingOptions

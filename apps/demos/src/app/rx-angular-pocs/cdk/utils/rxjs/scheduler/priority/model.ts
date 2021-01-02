export interface PrioritySchedulingOptions<P> {
  priority?: P
}

export interface DefaultSchedulingOptions {
  delay: number,
}

export type RxaSchedulingOptions<P> = PrioritySchedulingOptions<P> & DefaultSchedulingOptions

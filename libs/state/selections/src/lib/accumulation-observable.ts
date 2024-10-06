import { AccumulationFn } from './model';

export const defaultAccumulator: AccumulationFn = <T>(
  st: T,
  sl: Partial<T>,
): T => {
  return { ...st, ...sl };
};


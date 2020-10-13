import { CounterState } from './model';

export function updateCount(s: Pick<CounterState, 'count' | 'countUp' | 'countDiff'>) {
  return s.count + ((s.countUp ? 1 : -1) * s.countDiff)
}

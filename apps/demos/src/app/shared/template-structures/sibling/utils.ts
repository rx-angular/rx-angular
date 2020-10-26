import { toBoolean } from '../../debug-helper/value-provider';

export function toBooleanArray(num: number) {
  return new Array(num).fill(0).map(() => toBoolean(Math.random()))
}

import { toBoolean } from '../../debug-helper/value-provider';
import { toInt } from '../../utils/to-int';

export function toBooleanArray(num: number) {
  return new Array(num).fill(0).map(() => toBoolean(Math.random()))
}

export function toFloatArray(num: number) {
  return new Array(num).fill(0).map(() => Math.random())
}


export function toIntArray(num: number) {
  // tslint:disable-next-line:no-bitwise
  return new Array(num).fill(0).map(() => ~~(Math.random()*10))
}

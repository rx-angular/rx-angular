import { isKeyOf } from './typing';

export function safePluck<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  K5 extends keyof T[K1][K2][K3][K4],
  K6 extends keyof T[K1][K2][K3][K4][K5]
>(
  stateObject:
    | T
    | T[K1]
    | T[K1][K2]
    | T[K1][K2][K3]
    | T[K1][K2][K3][K4]
    | T[K1][K2][K3][K4][K5]
    | T[K1][K2][K3][K4][K5][K6],
  keys: Array<K1 | K2 | K3 | K4 | K5 | K6>
):
  | T
  | T[K1]
  | T[K1][K2]
  | T[K1][K2][K3]
  | T[K1][K2][K3][K4]
  | T[K1][K2][K3][K4][K5]
  | T[K1][K2][K3][K4][K5][K6] {
  let prop = stateObject;
  keys.forEach(key => {
    if (isKeyOf(key) && !!prop[key]) {
      prop = prop[key];
    }
  });
  return prop;
}

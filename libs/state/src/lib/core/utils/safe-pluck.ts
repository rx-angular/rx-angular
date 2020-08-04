import { isKeyOf } from './typing';

export function safePluck<T, K1 extends keyof T>(
  stateObject: T,
  keys: [K1]
): T[K1];

export function safePluck<T, K1 extends keyof T, K2 extends keyof T[K1]>(
  stateObject: T,
  keys: [K1, K2]
): T[K1][K2];

export function safePluck<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2]
>(stateObject: T, keys: [K1, K2, K3]): T[K1][K2][K3];

export function safePluck<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3]
>(stateObject: T, keys: [K1, K2, K3, K4]): T[K1][K2][K3][K4];

export function safePluck<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  K5 extends keyof T[K1][K2][K3][K4]
>(stateObject: T, keys: [K1, K2, K3, K4, K5]): T[K1][K2][K3][K4][K5];
export function safePluck<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  K5 extends keyof T[K1][K2][K3][K4],
  K6 extends keyof T[K1][K2][K3][K4][K5]
>(
  stateObject: T,
  keys:
    | [K1]
    | [K1, K2]
    | [K1, K2, K3]
    | [K1, K2, K3, K4]
    | [K1, K2, K3, K4, K5]
    | [K1, K2, K3, K4, K5, K6]
): T[K1][K2][K3][K4][K5][K6];

export function safePluck<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  K5 extends keyof T[K1][K2][K3][K4],
  K6 extends keyof T[K1][K2][K3][K4][K5]
>(
  stateObject: T,
  keys:
    | [K1]
    | [K1, K2]
    | [K1, K2, K3]
    | [K1, K2, K3, K4]
    | [K1, K2, K3, K4, K5]
    | [K1, K2, K3, K4, K5, K6]
):
  | T[K1]
  | T[K1][K2]
  | T[K1][K2][K3]
  | T[K1][K2][K3][K4]
  | T[K1][K2][K3][K4][K5]
  | T[K1][K2][K3][K4][K5][K6]
  | null {
  if (!keys || keys.length <= 0 || !stateObject) {
    // throw new Error('No params given to pluck');
    return null;
  }
  // clone keys in order to not mutate input
  const stateKeys = [...keys];
  let prop = stateObject[stateKeys.shift() as K1] || null;
  keys.forEach((key) => {
    if (!!prop && isKeyOf(key) && !!prop[key]) {
      prop = prop[key];
    }
  });
  return prop;
}

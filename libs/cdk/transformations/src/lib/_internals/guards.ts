export function isKeyOf<O>(k: unknown): k is keyof O {
  const typeofK = typeof k;
  return (
    k !== null &&
    k !== undefined &&
    ['string', 'symbol', 'number'].includes(typeofK)
  );
}

export function isObjectGuard(obj: unknown): obj is object {
  return (
    obj !== null &&
    obj !== undefined &&
    typeof obj === 'object' &&
    !Array.isArray(obj)
  );
}

export function isDefined(val: unknown): val is NonNullable<any> {
  return val !== null && val !== undefined;
}

/**
 * @description
 * Allows to pass only keys which value is of specific type.
 *
 * @example
 *
 * interface Creature {
 *  id: number;
 *  type: string;
 *  name: string;
 * }
 *
 * const cat = {id: 1, type: 'cat', name: 'Fluffy'};
 *
 * function updateCreature<T>(creature: T, key: OnlyKeysOfSpecificType<T, string>, value: string) {
 *  // update logic
 * }
 *
 * // Valid key
 * updateCreature(cat, 'name', 'Luna');
 *
 * // Invalid key
 * updateCreature(cat, 'id', 3);
 *
 * @docsPage OnlyKeysOfSpecificType
 * @docsCategory interfaces
 */
export type OnlyKeysOfSpecificType<T, S> = {
  [Key in keyof T]: S extends T[Key] ? Key : never;
}[keyof T];

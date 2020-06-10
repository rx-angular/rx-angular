export function toDictionary<T extends object, K extends keyof T>(
  array: T[],
  key: K
): { [key: string]: T } {
  if (['string', 'symbol', 'number'].includes(typeof array[0][key])) {
    return array.reduce(
      (acc, entity) => ({
        ...acc,
        [entity[key] as any]: entity
      }),
      {}
    );
  }

  console.error(
    'RxState toDictionary: value is not a number, string or symbol'
  );
  return {};
}

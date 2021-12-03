import { ComparableData } from '../interfaces/comparable-data-type';
import { valuesComparer } from '../_internals/valuesComparer.util';

/**
 * @deprecated moved to `@rx-angular/cdk/transformations`
 * @see {@link https://www.npmjs.com/package/@rx-angular/cdk}
 */
export function update<T extends object>(
  source: T[],
  updates: Partial<T>[] | Partial<T>,
  compare?: ComparableData<T>
): T[] {
  const updatesDefined = updates != null;
  const updatesAsArray = updatesDefined
    ? Array.isArray(updates)
      ? updates
      : [updates]
    : [];

  const sourceDefined = source != null;
  const sourceIsNotArray = !Array.isArray(source);
  const invalidInput =
    sourceIsNotArray || source.length === 0 || updatesAsArray.length === 0;

  if (sourceDefined && sourceIsNotArray) {
    console.warn(`Update: Original value (${source}) is not an array.`);
  }

  if (invalidInput) {
    return source;
  }

  const x: T[] = [];
  for (const existingItem of source) {
    const match = customFind(updatesAsArray, (item) =>
      valuesComparer(item as T, existingItem, compare)
    );

    x.push(match ? { ...existingItem, ...match } : existingItem);
  }

  return x;
}

function customFind<T>(array: T[], fn: (item: T) => boolean): T | undefined {
  for (const item of array) {
    const x = fn(item);
    if (x) {
      return item;
    }
  }
}

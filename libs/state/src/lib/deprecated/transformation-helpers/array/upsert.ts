import { isObjectGuard } from '../../utils';
import { valuesComparer } from '../_internals/valuesComparer.util';
import { ComparableData } from '../interfaces/comparable-data-type';

/**
 * @deprecated moved to `@rx-angular/cdk/transformations`
 * @see {@link https://www.npmjs.com/package/@rx-angular/cdk}
 */
export function upsert<T>(
  source: T[],
  update: Partial<T>[] | Partial<T>,
  compare?: ComparableData<T>
): T[] {
  // check inputs for validity
  const updatesAsArray =
    update != null ? (Array.isArray(update) ? update : [update]) : [];
  // check inputs for validity
  const sourceIsNotArray = !Array.isArray(source);
  const invalidInput = sourceIsNotArray && updatesAsArray.length === 0;
  // if the source value is not an Array or the input is not defined return the original source
  // this is the case for any edge case:
  // '', null, undefined, CustomObjectOfDoomAndDarkness, ...
  if (invalidInput) {
    return source;
  }

  // if source is empty array or not an array, but the updates are valid:
  // return a shallow copy of the updates as result
  if (updatesAsArray.length > 0 && (sourceIsNotArray || source.length === 0)) {
    return [...updatesAsArray] as T[];
  }

  const inserts: T[] = [];
  const updates: Record<number, Partial<T>> = {};
  // process updates/inserts
  for (const item of updatesAsArray) {
    const match = source.findIndex((sourceItem) =>
      valuesComparer(item as T, sourceItem, compare)
    );
    // if item already exists, save it as update
    if (match !== -1) {
      updates[match] = item;
    } else {
      // otherwise consider this as insert
      if (isObjectGuard(item)) {
        // create a shallow copy if item is an object
        inserts.push({ ...(item as T) });
      } else {
        // otherwise just push it
        inserts.push(item);
      }
    }
  }

  const updated = source.map((item, i) => {
    const updatedItem = updates[i];
    // process the updated
    if (updatedItem !== null && updatedItem !== undefined) {
      if (isObjectGuard(item)) {
        return { ...item, ...updatedItem } as T;
      } else {
        return updatedItem as T;
      }
    }
    return item;
  });

  // return the combination of the updated source & the inserts as new array
  return updated.concat(inserts);
}

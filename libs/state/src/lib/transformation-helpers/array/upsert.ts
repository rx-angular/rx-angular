import { isDefined } from '../../core/utils/guards';
import { valuesComparer } from '../_internals/valuesComparer.util';
import { ComparableData } from '../interfaces/comparable-data-type';

export function upsert<T extends object>(
  source: T[],
  update: T | T[] | Partial<T>[] | Partial<T>,
  compare?: ComparableData<T>
): T[] {
  const updatesAsArray = update
                         ? Array.isArray(update)
                           ? update
                           : [update]
                         : [];

  const sourceDefined = isDefined(source);
  const sourceIsArray = Array.isArray(source);
  const invalidInput = !sourceIsArray && !isDefined(update);

  if (invalidInput) {
    return source;
  }

  if (!sourceDefined || !source.length || !sourceIsArray) {
    return [...updatesAsArray] as T[];
  }

  const inserts: T[] = [];
  const updates: Record<number, Partial<T>> = {};
  updatesAsArray.forEach(item => {
    const match = source.findIndex(sourceItem => valuesComparer(item as T, sourceItem, compare));
    if (match !== -1) {
      updates[match] = item;
    } else {
      inserts.push({ ...item as T });
    }
  });
  const updated = Object.keys(updates).length === 0 ?
                  source :
                  source.map((item, i) => {
                    const updatedItem = updates[i];
                    if (updatedItem) {
                      return { ...item, ...updatedItem };
                    }
                    return item;
                  });
  return [...updated, ...inserts];
}

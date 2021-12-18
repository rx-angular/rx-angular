import { ComparableData } from '../interfaces/comparable-data-type';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { isDefined } from '@rx-angular/state/selections';
import { valuesComparer } from '../_internals/valuesComparer.util';

/**
 * @deprecated moved to `@rx-angular/cdk/transformations`
 * @see {@link https://www.npmjs.com/package/@rx-angular/cdk}
 */
export function remove<T>(
  source: T[],
  scrap: Partial<T>[] | Partial<T>,
  compare?: ComparableData<T>
): T[] {
  const scrapAsArray = isDefined(scrap)
    ? Array.isArray(scrap)
      ? scrap
      : [scrap]
    : [];
  const invalidInput = !Array.isArray(source);

  if (invalidInput) {
    console.warn(`Remove: original value (${source}) is not an array`);
    return source;
  }

  return source.filter((existingItem) => {
    return !scrapAsArray.some((item) =>
      valuesComparer(item as T, existingItem, compare)
    );
  });
}

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { isDefined } from '@rx-angular/state/selections';

/**
 * @deprecated moved to `@rx-angular/cdk/transformations`
 * @see {@link https://www.npmjs.com/package/@rx-angular/cdk}
 */
export function insert<T>(source: T[], updates: T | T[]): T[] {
  const updatesDefined = isDefined(updates);
  const sourceIsNotArray = !Array.isArray(source);
  const invalidInput = sourceIsNotArray && !updatesDefined;

  if (sourceIsNotArray && isDefined(source)) {
    console.warn(`Insert: Original value (${source}) is not an array.`);
  }

  if (invalidInput) {
    return source;
  }

  return (sourceIsNotArray ? [] : source).concat(
    updatesDefined ? (Array.isArray(updates) ? updates : [updates]) : []
  );
}

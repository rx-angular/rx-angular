// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CompareFn } from '@rx-angular/state/selections';

/**
 * @deprecated moved to `@rx-angular/cdk/transformations`
 * @see {@link https://www.npmjs.com/package/@rx-angular/cdk}
 */
export type ComparableData<T> = CompareFn<T> | keyof T | (keyof T)[];

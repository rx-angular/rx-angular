import { CompareFn } from '../../cdk/interfaces/compare-fn';

/**
 * @deprecated moved to `@rx-angular/cdk/transformations`
 * @see {@link https://www.npmjs.com/package/@rx-angular/cdk}
 */
export type ComparableData<T> = CompareFn<T> | keyof T | (keyof T)[];

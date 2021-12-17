import { CompareFn } from '@rx-angular/cdk/state';

export type ComparableData<T> = CompareFn<T> | keyof T | (keyof T)[];

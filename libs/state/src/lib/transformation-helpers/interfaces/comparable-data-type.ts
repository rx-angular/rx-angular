import { CompareFn } from '../../rxjs/interfaces';

export type ComparableData<T> = CompareFn<T> | keyof T | (keyof T)[];

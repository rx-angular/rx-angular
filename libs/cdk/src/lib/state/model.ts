import { Observable } from 'rxjs';
import { ExtractObservableValue } from '../utils/model';

/**
 * Type to specify an object of observables
 */
export type ObservableMap = Record<string, Observable<any>>;

/**
 * Type to map `ObservableMap` to a static record type
 * the 'in' syntax forces the type specification by key
 */
export type ObservableAccumulation<T extends ObservableMap> = {
  [K in keyof T]: ExtractObservableValue<T[K]>;
};

/**
 * This type avoids empty objects
 */
export type NotEmpty<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

/**
 * @deprecated moved to `@rx-angular/cdk/state`
 * @see {@link https://www.npmjs.com/package/@rx-angular/cdk}
 */
export type PickSlice<T extends object, K extends keyof T> = Pick<T,
  { [I in K]: I }[K]>;

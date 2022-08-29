/**
 * @deprecated moved to `@rx-angular/cdk/transformations`
 * @see {@link https://www.npmjs.com/package/@rx-angular/cdk}
 */
export type OnlyKeysOfSpecificType<T, S> = {
  [Key in keyof T]: S extends T[Key] ? Key : never;
}[keyof T];

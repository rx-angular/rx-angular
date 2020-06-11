export type OnlyKeysOfSpecificType<T, S> = {
  [Key in keyof T]: S extends T[Key] ? Key : never;
}[keyof T];

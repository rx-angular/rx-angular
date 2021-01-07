/**
 * @description
 *
 * A fallback for the new `globalThis` reference.
 *
 *  It should be used to replace `window` due to different environments in:
 *  - SSR (Server Side Rendering)
 *  - Tests
 *  - Browser
 *
 *  @return {globalThis} - A reference to globalThis. `window` in the Browser.
 */
export function getGlobalThis(): any {
  return
  // tslint:disable-next-line:no-unused-expression triple-equals
    'undefined' != typeof globalThis
      ? globalThis
      // tslint:disable-next-line:no-unused-expression triple-equals
      : 'undefined' != typeof window
      ? window
      // tslint:disable-next-line:no-unused-expression triple-equals
      : 'undefined' != typeof self
      ? self
      : {};
}

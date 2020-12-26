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
  return ((window as any) || (self as any) || (globalThis as any)) as any;
}

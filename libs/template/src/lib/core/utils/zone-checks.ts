import { getGlobalThis } from './get-global-this';

/**
 * getZoneUnPatchedApi
 *
 * @description
 *
 * This function returns the zone un-patched API for the a specific Browser API.
 * If no element is passed the window is used instead
 *
 * @param name {string} - The name of the API to check.
 * @param elem {any} - The elem to get un-patched API from.
 * @return {Function} - The zone un-patched API in question.
 *
 */
export function getZoneUnPatchedApi<T = Function>(name: string, elem?: object): T {
  elem = elem || getGlobalThis();
  return isApiZonePatched(name, elem) ? elem['__zone_symbol__' + name] : elem[name];
}


/**
 * envZonePatched
 *
 * @description
 *
 * This function checks the window object `zone.js` was instantiated.
 * If so, the `window` object maintains a property named `Zone`.
 *
 * Here how Angular checks it: https://github.com/angular/angular/blob/master/packages/core/src/zone/ng_zone.ts#L123
 *
 * @return {boolean} - true if `zone.js` patched global APIs.
 *
 */
export function isEnvZonePatched(): boolean {
  return getGlobalThis().Zone !== undefined;
}

/**
 * apiZonePatched
 *
 * @description
 *
 * This function checks if a specific Browser API is patched by `zone.js`.
 *
 * @param name - The name of the API to check.
 * @param elem - The name of the API to check.
 * @return {boolean} - true if `zone.js` patched the API in question.
 *
 */
export function isApiZonePatched(name: string, elem: object): boolean {
  // if symbol is present, zone patched the API
  return elem['__zone_symbol__' + name] !== undefined;
}

const zoneDetectionCache = new WeakMap<any, boolean>();

/**
 * isNgZone
 *
 * @description
 *
 * This function takes an instance of a class which implements the NgZone interface and checks if
 * its `runOutsideAngular()` function calls `apply()` on the function passed as parameter. This
 * means the Angular application that instantiated this service assumes it runs in a ZoneLess
 * environment, and therefore it's change detection will not be triggered by zone related logic.
 *
 * However, keep in mind this does not mean `zone.js` is not present.
 * The environment could still run in ZoneFull mode even if Angular turned it off.
 * Consider the situation of a Angular element configured for ZoneLess
 * environments is used in an Angular application relining on the zone mechanism.
 *
 * @param instance {Class Instance} - The instance to check for constructor name of `NgZone`.
 * @return {boolean} - true if instance is of type `NgZone`.
 *
 */
export function isNgZone(instance: any): boolean {
  const cachedValue = zoneDetectionCache.get(instance);

  if (cachedValue !== undefined) {
    return cachedValue;
  }

  let calledApply = false;

  function fn() {}
  fn.apply = () => (calledApply = true);

  instance.runOutsideAngular(fn);
  zoneDetectionCache.set(instance, calledApply);

  return calledApply;
}

/**
 * isNoopNgZone
 *
 *@description
 *
 * This function takes any instance of a class and checks
 * if the constructor name is equal to `NoopNgZone`.
 *
 * For more detailed information read the description of [isNgZone](#isngzone).
 *
 * @param instance {Class Instance} - The instance to check for constructor name of `NoopNgZone`.
 * @return {boolean} - true if instance is of type `NoopNgZone`.
 *
 */
export function isNoopNgZone(instance: any): boolean {
  return !isNgZone(instance);
}


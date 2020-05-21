import { apiZonePatched, getGlobalThis } from '../utils';

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
export function getZoneUnPatchedApi(name: string, elem?: any): Function {
  elem = elem || getGlobalThis();
  return apiZonePatched(name) ? elem['__zone_symbol__' + name] : elem[name];
}

/**
 * reapplyEventListenerZoneUnPatched
 *
 * @description
 *
 * This function takes an elem and event and re-applies the listeners from the passed event to the
 * passed element with the zone un-patched version of it.
 *
 * @param elem {HTMLElement} - The elem to re-apply the listeners to.
 * @param event {string} - The name of the event from which to re-apply the listeners.
 *
 */
export function revertEventListenerZonePatch(elem: HTMLElement, event: string) {
  const eventListeners = (elem as any).eventListeners(event);
  // Return if no event listeners are present
  if (!eventListeners) {
    return;
  }

  const addEventListener = getZoneUnPatchedApi('addEventListener', elem).bind(
    elem
  );
  eventListeners.forEach(listener => {
    // Remove and reapply listeners with patched API
    elem.removeEventListener(event, listener);
    // Reapply listeners with un-patched API
    addEventListener(event, listener);
  });
}

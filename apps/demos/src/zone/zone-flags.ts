export const eventTargets = [
  window,
  Document,
  HTMLBodyElement,
  HTMLBodyElement.prototype,
  HTMLElement,
  HTMLElement.prototype
];

export const allTargets: targetSet[] = [
  [window, allEvents],
  [Document, allEvents],
  [HTMLBodyElement, allEvents],
  [HTMLBodyElement.prototype, allEvents],
  [HTMLBodyElement.prototype, allEvents],
  [HTMLElement.prototype, allEvents]
];


export const globalAPIs = [
  'ZoneAwarePromise',
  'requestAnimationFrame',
  'on_property',
  'toString',
  'EventTarget',
  'XHR',
  'mediaQuery',
  'timers'
];

type targetSet = [any, string[]];

export function setupTargets(targets: targetSet[]): void {
  (window as any).__Zone_ignore_on_properties = targets
    .reduce((a, [target, ignoreProperties]) => ({
      ...a,
      [target]: ignoreProperties
    }), {});
  console.log((window as any).__Zone_ignore_on_properties);
}

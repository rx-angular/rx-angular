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

// Disable patching of window/global APIs
export function disableGlobalAPIs(apis: string[]) {
  apis.forEach(api => {
    (window as any)['__Zone_disable_'+api] = true;
  });
}

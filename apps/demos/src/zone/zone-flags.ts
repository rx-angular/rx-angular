export const mouseEvent = [
  // (MouseEvent)[https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent]
  'mousedown',
  'mouseenter',
  'mouseleave',
  'mousemove',
  'mouseout',
  'mouseover',
  'mouseup',
  'click',
  // (WheelEvent)[https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent]
  'wheel'
];

export const touchEvents = [
  // [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent)
  'pointerover',
  'pointerenter',
  'pointerdown',
  'pointermove',
  'pointerrawupdate',
  'pointerup',
  'pointercancel',
  'pointerout',
  'pointerleave',
  'gotpointercapture',
  'lostpointercapture',
  'pointerup',

  // [TouchEvent](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent)
  'touchstart',
  'touchend',
  'touchmove',
  'touchcancel',

  'drag',
  'dragend',
  'dragenter',
  'dragleave',
  'dragover',
  'dragstart',
  'drop'
];

export const formControlsEvents = [
  'change',
  'blur',
  'focus',
  'contextmenu',
  'input'
];

export const globalEvents = [
  // window
  'scroll',
  'load',
  'error'
];

export const eventGroups = {
  mouseEvent,
  touchEvents,
  formControlsEvents,
  globalEvents
};

export const allEvents = [
  ...mouseEvent,
  ...touchEvents,
  ...formControlsEvents,
  ...globalEvents
];

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

export enum zoneSymbols {
  requestAnimationFrame = '__Zone_disable_requestAnimationFrame',
  setTimeout = '__Zone_disable_setTimeout',
  setInterval = '__Zone_disable_setInterval',
  unpatchedEvents = '__zone_symbol__UNPATCHED_EVENTS',
}


export interface ZoneConfigurator {
  disable: <T>(...optionSet: flagAndOption) => void
}

type flagAndOption = [zoneSymbols.requestAnimationFrame, boolean] |
  [zoneSymbols.setInterval, boolean] |
  [zoneSymbols.setTimeout, boolean] |
  [zoneSymbols.unpatchedEvents, string[]]
  ;

function getZoneConfigurator(): ZoneConfigurator {
  return {
    disable
  };

  function disable<T>(...optionSet: flagAndOption) {
    (window as any)[optionSet[0]] = optionSet[1];
  }
}

export const zoneConfigurator = getZoneConfigurator();

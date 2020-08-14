// (window as any).__Zone_disable_ZoneAwarePromise = true;
// (window as any).__Zone_disable_requestAnimationFrame = true; // disable patch requestAnimationFrame
// (window as any).__Zone_disable_on_property = true;
// (window as any).__Zone_disable_toString = true;
// (window as any).__Zone_disable_EventTarget = true;
// (window as any).__Zone_disable_XHR = true;
// (window as any).__Zone_disable_mediaQuery = true;
// (window as any).__Zone_disable_timers = true;
const blacklistedEvents = [
  // 'scroll',
  // 'mousedown',
  // 'mouseenter',
  // 'mouseleave',
  // 'mousemove',
  // 'mouseout',
  // 'mouseover',
  // 'mouseup',
  // 'load',
  // 'pointerup',
  // 'change',
  // 'blur',
  // 'focus',
  // 'click',
  // 'contextmenu',
  // 'drag',
  // 'dragend',
  // 'dragenter',
  // 'dragleave',
  // 'dragover',
  // 'dragstart',
  // 'drop',
  // 'input'
];

const targets = [
  window,
  Document,
  HTMLBodyElement,
  HTMLBodyElement.prototype,
  HTMLElement,
  HTMLElement.prototype,
];
(window as any).__Zone_ignore_on_properties = [];
targets.forEach((target) => {
  (window as any).__Zone_ignore_on_properties.push({
    target,
    ignoreProperties: blacklistedEvents,
  });
});

(window as any).__zone_symbol__BLACK_LISTED_EVENTS = blacklistedEvents;
(window as any).__zone_symbol__UNPATCHED_EVENTS = blacklistedEvents;

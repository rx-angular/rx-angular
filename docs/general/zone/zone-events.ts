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

export function setupTargets(targets) {
  (window as any).__Zone_ignore_on_properties = targets.forEach((target) => ({
      target,
      ignoreProperties: allEvents
    })
  );
}

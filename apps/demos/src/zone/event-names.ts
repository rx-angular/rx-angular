// Standard Events

// User Interface Events

// UIEvent
export const uiEvent = [
  'load',
  'unload',
  'abort',
  'error',
  'select'
];

// Focus Events
export const focusEvent = [
  'blur',
  'focus',
  'focusin',
  'focusout'
];

// Mouse Events
// (MouseEvent)[https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent]
export const mouseEvent = [
  'mousedown',
  'dblclick',
  'mouseenter',
  'mouseleave',
  'mousemove',
  'mouseout',
  'mouseover',
  'mouseup',
  'click'
];

// Wheel Events
export const wheelEvent = [
  // (WheelEvent)[https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent]
  'wheel'
];

// Input Events
export const inputEvent = [
  'beforeinput',
  'input'
];

// Keyboard Events
export const keyboardEvent = [
  'keydown',
  'keyup'
];

// Composition Events
export const compositionEvent = [
  'compositionstart',
  'compositionupdate',
  'compositionend'
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


export const standardEvents = [

];

export const allEvents = [
  ...mouseEvent,
  ...touchEvents,
  ...formControlsEvents,
  ...globalEvents
];

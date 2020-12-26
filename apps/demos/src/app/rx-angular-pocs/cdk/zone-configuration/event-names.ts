// Standard Events

// User Interface Events

// UIEvent
export const uiEvent = ['load', 'unload', 'abort', 'error', 'select'];

// Focus Events
export const focusEvent = ['blur', 'focus', 'focusin', 'focusout'];

// Selection Events
export const selectionEvent = ['selectionchange'];

// Mouse Events
// (MouseEvent)[https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent]
export const mouseEvent: (keyof WindowEventMap)[] = [
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
export const wheelEvent: (keyof WindowEventMap)[] = [
  // (WheelEvent)[https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent]
  'wheel'
];

// Input Events
export const inputEvent: (keyof WindowEventMap)[] = [
  // 'beforeinput',
  'input'
];

// Keyboard Events
export const keyboardEvent: (keyof WindowEventMap)[] = ['keydown', 'keyup'];

// Composition Events
export const compositionEvent = [
  'compositionstart',
  'compositionupdate',
  'compositionend'
];

export const touchEvents: (keyof WindowEventMap)[] = [
  // [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent)
  'pointerover',
  'pointerenter',
  'pointerdown',
  'pointermove',
  // 'pointerrawupdate',
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

export const formControlsEvents: (keyof WindowEventMap)[] = [
  'change',
  'blur',
  'focus',
  'contextmenu',
  'input'
];

export const globalEvents: (keyof WindowEventMap)[] = [
  // window
  'scroll',
  'load',
  'error'
];

// XHREvent
export const xhrEvent = ['XHR'];

export const websocketEvents: (keyof WebSocketEventMap)[] = [
  'close',
  'error',
  'message',
  'open'
];

export const allEvents: string[] = [
  ...uiEvent,
  ...focusEvent,
  ...selectionEvent,
  ...mouseEvent,
  ...wheelEvent,
  ...inputEvent,
  ...keyboardEvent,
  ...compositionEvent,
  ...touchEvents,
  ...formControlsEvents,
  ...globalEvents,
  ...xhrEvent,
  ...websocketEvents
];

// Standard Events

// User Interface Events

// UIEvent
export const uiEvent = ['load', 'unload', 'abort', 'error', 'select'];

// Focus Events
export const focusEvent = ['blur', 'focus', 'focusin', 'focusout'];

// Selection Events
export const selectionEvent = ['selectionchange'];

/**
 * Mouse Events
 * (MouseEvent)[https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent]
 */
export const mouseEvent: (keyof WindowEventMap)[] = [
  'mousedown',
  'dblclick',
  'mouseenter',
  'mouseleave',
  'mousemove',
  'mouseout',
  'mouseover',
  'mouseup',
  'click',
];

/**
 * Wheel Events
 * (WheelEvent)[https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent]
 */
export const wheelEvent: (keyof WindowEventMap)[] = ['wheel'];

// Input Events
export const inputEvent: (keyof WindowEventMap)[] = [
  // 'beforeinput',
  'input',
];

// Keyboard Events
export const keyboardEvent: (keyof WindowEventMap)[] = ['keydown', 'keyup'];

// Composition Events
export const compositionEvent = [
  'compositionstart',
  'compositionupdate',
  'compositionend',
];

/**
 * Touch Events
 * [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent)
 * [TouchEvent](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent)
 */
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
  'drop',
];

export const formControlsEvents: (keyof WindowEventMap)[] = [
  'change',
  'blur',
  'focus',
  'contextmenu',
  'input',
];

export const globalEvents: (keyof WindowEventMap)[] = [
  // window
  'scroll',
  'load',
  'error',
];

/**
 * Basic XHR Events
 * [Load](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/load_event)
 * [Error](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/error_event)
 * There are more events you may want to unpatch https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
 */
export const xhrEvent = ['load', 'error'];

export const websocketEvents: (keyof WebSocketEventMap)[] = [
  'close',
  'error',
  'message',
  'open',
];

/**
 * All Events combined
 */
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
  ...websocketEvents,
];

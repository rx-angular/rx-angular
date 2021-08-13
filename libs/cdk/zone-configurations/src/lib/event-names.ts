// Standard Events

// Focus Events
export const focusEvents = ['blur', 'focus', 'focusin', 'focusout'] as const;

/**
 * Mouse Events
 * (MouseEvent)[https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent]
 */
export const mouseEvents = [
  'mousedown',
  'dblclick',
  'mouseenter',
  'mouseleave',
  'mousemove',
  'mouseout',
  'mouseover',
  'mouseup',
  'click',
] as const;

/**
 * Wheel Events
 * (WheelEvent)[https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent]
 */
export const wheelEvents = [
  // (WheelEvent)[https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent]
  'wheel',
  'mousewheel',
] as const;

// Input Events
export const inputEvents = [
  'input',
  'invalid',
  'change',
  'reset',
  'select',
  'submit',
] as const;

/**
 * @deprecated
 */
export const formControlsEvents = inputEvents;

// [KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)
export const keyboardEvents = ['keydown', 'keypress', 'keyup'] as const;

// [VR]()
export const vrEvents = [
  'vrdisplayactivate',
  'vrdisplayblur',
  'vrdisplayconnect',
  'vrdisplaydeactivate',
  'vrdisplaydisconnect',
  'vrdisplayfocus',
  'vrdisplaypointerrestricted',
  'vrdisplaypointerunrestricted',
  'vrdisplaypresentchange',
] as const;

// [MSGesture]()
export const mSGestureEvents = [
  'MSGestureChange',
  'MSGestureDoubleTap',
  'MSGestureEnd',
  'MSGestureHold',
  'MSGestureStart',
  'MSGestureTap',
  'MSInertiaStart',
  'MSPointerCancel',
  'MSPointerDown',
  'MSPointerEnter',
  'MSPointerLeave',
  'MSPointerMove',
  'MSPointerOut',
  'MSPointerOver',
  'MSPointerUp',
] as const;

// [xPrint](https://developer.mozilla.org/en-US/docs/Web/API/Window/afterprint_event)
export const printEvents = ['afterprint', 'beforeprint'] as const;
// [network]()
export const networkEvents = ['offline', 'online'] as const;

// [network]()
export const audioEvents = [
  'canplay',
  'canplaythrough',
  'pause',
  'play',
  'playing',
  'volumechange',
] as const;

// Composition Events
export const compositionEvents = [
  'compositionstart',
  'compositionupdate',
  'compositionend',
] as const;

/**
 * Touch Events
 * [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent)
 * [TouchEvent](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent)
 */
export const touchEvents = [
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

  // [DragEvent](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent)
  'drag',
  'dragend',
  'dragexit',
  'dragenter',
  'dragleave',
  'dragover',
  'dragstart',
  'drop',
] as const;

export const globalEvents = [
  'contextmenu',
  'resize',
  'scroll',

  'abort',
  'load',
  'loadeddata',
  'loadedmetadata',
  'loadstart',
  'unload',

  'error',
] as const;

export const websocketEvents = ['close', 'error', 'message', 'open'] as const;

/**
 * Basic XHR Events
 * [Load](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/load_event)
 * [Error](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/error_event)
 * There are more events you may want to unpatch https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
 */
// XHREvent (group is here to make it easier to target XHR in angular applications. It contains redundant events e.g. 'error')
export const xhrEvents = ['load', 'error'] as const;

// @TODO
export const windowEvents = [
  'compassneedscalibration',
  'durationchange',
  'emptied',
  'ended',

  'orientationchange',

  'ratechange',

  'seeked',
  'seeking',
  'stalled',

  'suspend',
  'timeupdate',
  'waiting',
] as const;

/**
 * All Events combined
 */
export const allEvents = Array.from(
  new Set([
    ...focusEvents,
    ...mouseEvents,
    ...wheelEvents,
    ...inputEvents,
    ...keyboardEvents,
    ...inputEvents,
    ...vrEvents,
    ...mSGestureEvents,
    ...printEvents,
    ...networkEvents,
    ...audioEvents,
    ...compositionEvents,
    ...touchEvents,
    ...globalEvents,
    ...websocketEvents,
    ...xhrEvents,
    ...windowEvents,
  ])
);

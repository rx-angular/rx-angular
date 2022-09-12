/**
 * @description
 * This transform is a side effecting operation applying `preventDefault` to a passed Event
 * @param e
 */
export function preventDefault(e: Event): Event {
  e.preventDefault();
  return e;
}

/**
 * @description
 * This transform is a side effecting operation applying `stopPropagation` to a passed Event
 * @param e
 */
export function stopPropagation(e: Event): Event {
  e.stopPropagation();
  return e;
}

/**
 * @description
 * This transform is a side effecting operation applying `preventDefault` and `stopPropagation` to a passed Event
 * @param e
 */
export function preventDefaultStopPropagation(e: Event): Event {
  e.stopPropagation();
  e.preventDefault();
  return e;
}


/**
 * @description
 * This transform is helps to pluck values from DOM `Event` or forward the value directly.
 * @param e
 */
export function eventValue<T = string>(e: Event | T): T {
  // Consider https://stackoverflow.com/questions/1458894/how-to-determine-if-javascript-object-is-an-event
  if((e as unknown as {target: {value: T}})?.target) {
    return (e as unknown as {target: {value: T}})?.target?.value;
  }
  return e as T;
}

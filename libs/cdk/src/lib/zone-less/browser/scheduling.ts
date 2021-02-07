import { getZoneUnPatchedApi } from '../utils';

export const Promise: PromiseConstructor = getZoneUnPatchedApi('Promise');

/**
 * requestAnimationFrame
 *
 * @description
 *
 * This function is a zone un-patched implementation of Window setInterval() method
 *
 * The requestAnimationFrame() method calls a function or evaluates an expression on the next animationFrame.
 * The requestAnimationFrame() method will not continue calling the function after executed once.
 * The ID value returned by requestAnimationFrame() is used as the parameter for the cancelAnimationFrame() method.
 *
 * requestAnimationFrame(cb, ms);
 *
 * @param cb {Function} - Required. The function that will be executed
 *
 */
export function requestAnimationFrame(cb: Function): number {
  return getZoneUnPatchedApi('requestAnimationFrame')(cb);
}

/**
 * cancelAnimationFrame
 *
 * @description
 *
 * This function is a zone un-patched implementation of Window requestAnimationFrame() method
 *
 * The cancelAnimationFrame() method clears a timer set with the requestAnimationFrame() method.
 * The ID value returned by requestAnimationFrame() is used as the parameter for the cancelAnimationFrame() method.
 *
 * To be able to use the cancelAnimationFrame() method, you must use a variable when creating the requestAnimationFrame method:
 *
 * const id = requestAnimationFrame("javascript function");
 * Then you will be able to stop the execution by calling the cancelAnimationFrame() method.
 *
 * cancelAnimationFrame(id);
 *
 * @param id {number} - Required. The ID value of the timer returned by the requestAnimationFrame() method
 *
 */

export function cancelAnimationFrame(id: number): void {
  getZoneUnPatchedApi('cancelAnimationFrame')(id);
}

/**
 * setInterval
 *
 * @description
 *
 * This function is a zone un-patched implementation of Window setInterval() method
 *
 * The setInterval() method calls a function or evaluates an expression at specified intervals (in milliseconds).
 * The setInterval() method will continue calling the function until clearInterval() is called, or the window is closed.
 * The ID value returned by setInterval() is used as the parameter for the clearInterval() method.
 *
 * setInterval(cb, ms);
 *
 * @param cb {Function} - Required. The function that will be executed
 * @param ms {number} - Required. The intervals (in milliseconds) on how often to execute the code. If the value is less than 10, the value 10 is used
 *
 */
export function setInterval(cb: Function, ms: number = 0): void {
  return getZoneUnPatchedApi('setInterval')(cb, ms);
}

/**
 * clearInterval
 *
 * @description
 *
 * This function is a zone un-patched implementation of Window clearInterval() method
 *
 * The clearInterval() method clears a timer set with the setInterval() method.
 * The ID value returned by setInterval() is used as the parameter for the clearInterval() method.
 *
 * To be able to use the clearInterval() method, you must use a variable when creating the interval method:
 *
 * const id = setInterval("javascript function", milliseconds);
 * Then you will be able to stop the execution by calling the clearInterval() method.
 *
 * clearInterval(id);
 *
 * @param id {number} - Required. The ID value of the timer returned by the setInterval() method
 *
 */
export function clearInterval(id: number): void {
  return getZoneUnPatchedApi('clearInterval')(id);
}

/**
 * setTimeout
 *
 * @description
 *
 * This function is a zone un-patched implementation of Window setTimeout() method
 *
 * The setTimeout() method calls a function or evaluates an expression after a specified number of milliseconds.
 * The function is only executed once. If you need to repeat execution, use the setInterval() method.
 * Use the clearTimeout() method to prevent the function from running.
 *
 * setTimeout(cb, ms);
 *
 * @param cb {Function} - Required. The function that will be executed
 * @param ms {number} - Optional. The number of milliseconds to wait before executing the code. If omitted, the value 0 is used
 *
 */
export function setTimeout(cb: Function, ms: number = 0): void {
  return getZoneUnPatchedApi('setTimeout')(cb, ms);
}

/**
 * clearTimeout
 *
 * @description
 *
 * This function is a zone un-patched implementation of Window clearTimeout() method
 *
 * The clearTimeout() method clears a timer set with the setTimeout() method.
 * The ID value returned by setTimeout() is used as the parameter for the clearTimeout() method.
 *
 * const id = setTimeout("javascript function", milliseconds);
 * Then, if the function has not already been executed, you will be able to stop the execution by calling the clearTimeout() method.
 *
 * clearTimeout(id);
 *
 * @param id {number} -	Required. The ID value of the timer returned by the setTimeout() method
 *
 */
export function clearTimeout(id: number): void {
  return getZoneUnPatchedApi('clearTimeout')(id);
}

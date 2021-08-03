import { SchedulerLike } from 'rxjs';

export function isNumeric(val: any): val is number | string {
  // parseFloat NaNs numeric-cast false positives (null|true|false|"")
  // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
  // subtraction forces infinities to NaN
  // adding 1 corrects loss of precision from parseFloat (#15100)
  return !Array.isArray(val) && val - parseFloat(val) + 1 >= 0;
}

export function isScheduler(value: any): value is SchedulerLike {
  return value && typeof (<any>value).schedule === 'function';
}

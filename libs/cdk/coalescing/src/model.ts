import { Type } from '@angular/core';

export type coalescingObj =
  | Record<string | number | symbol, unknown>
  | Type<unknown>
  | object;
export interface RxCoalescingOptions {
  scope?: coalescingObj;
}

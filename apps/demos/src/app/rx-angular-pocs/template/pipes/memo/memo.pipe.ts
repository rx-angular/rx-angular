import { Pipe, PipeTransform } from '@angular/core';
import { getMemoizedFn } from './memo-map';

@Pipe({ name: 'memo', pure: true })
export class MemoPipe<U> implements PipeTransform {

  transform<T>(
    args: null,
    fn: (args: null) => unknown
  ): unknown;
  transform<T>(
    args: undefined,
    fn: (args: undefined) => unknown
  ): unknown;
  transform<T>(
    args: any[],
    fn: (...args: any[]) => unknown
  ): unknown;
  transform<T>(
    args: T | undefined | null,
    fn: (args) => unknown
  ): unknown | null | undefined {
    const momoizedFn = getMemoizedFn(fn);
    return momoizedFn(args);
  }
}

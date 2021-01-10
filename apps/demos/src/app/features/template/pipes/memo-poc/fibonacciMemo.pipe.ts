import { Pipe, PipeTransform } from '@angular/core';
import { fibonacci } from '../../../../shared/debug-helper/work';
import { getMemoizedFn } from '../../../../rx-angular-pocs';

@Pipe({
  name: 'fibonacciMemo',
  pure: true
})
export class FibonacciMemoPipe implements PipeTransform {
  fibonacciMemoized = getMemoizedFn(fibonacci)
  transform(value: any, ...args: unknown[]): unknown {
    return this.fibonacciMemoized(value);
  }

}

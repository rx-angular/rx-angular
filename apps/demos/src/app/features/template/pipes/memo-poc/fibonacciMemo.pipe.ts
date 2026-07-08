import { Pipe, PipeTransform } from '@angular/core';
import { getMemoizedFn } from '../../../../rx-angular-pocs';
import { fibonacci } from '../../../../shared/debug-helper/work';

@Pipe({
  name: 'fibonacciMemo',
  pure: true,
  standalone: false,
})
export class FibonacciMemoPipe implements PipeTransform {
  fibonacciMemoized = getMemoizedFn(fibonacci);
  transform(value: any, ...args: unknown[]): unknown {
    return this.fibonacciMemoized(value);
  }
}

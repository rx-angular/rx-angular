import { Pipe, PipeTransform } from '@angular/core';
import { fibonacci } from '../../../../shared/debug-helper/work';

@Pipe({
  name: 'fibonacci',
  pure: true
})
export class FibonacciPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    return fibonacci(value);
  }

}

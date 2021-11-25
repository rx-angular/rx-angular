import { Pipe, PipeTransform } from '@angular/core';
import { Observable,OperatorFunction } from 'rxjs';

@Pipe({ name: 'pipe', pure: true })
export class PipePipe<T, U> implements PipeTransform {

  transform(
    potentialObservable: Observable<T>,
    operatorFn?: OperatorFunction<T, U>,
  ): Observable<U> {
    return potentialObservable.pipe(operatorFn)
  }

}

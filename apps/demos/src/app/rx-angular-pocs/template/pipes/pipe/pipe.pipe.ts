import { Pipe, PipeTransform } from '@angular/core';
import { Observable,OperatorFunction } from 'rxjs';

@Pipe({ name: 'pipe', pure: true })
export class PipePipe<T, U> implements PipeTransform {

  transform(
    potentialObservable: null,
    operatorFn?: OperatorFunction<T, any>,
  ): null;
  transform(
    potentialObservable: undefined,
    operatorFn?: OperatorFunction<T, any>,
  ): undefined;
  transform(
    potentialObservable: Observable<T>,
    operatorFn?: OperatorFunction<T, any>,
  ): T;
  transform(
    potentialObservable: Observable<T>,
    operatorFn?: OperatorFunction<T, U>,
  ): Observable<U> {
    return potentialObservable.pipe(operatorFn)
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { Observable,OperatorFunction } from 'rxjs';

@Pipe({ name: 'pipe', pure: true })
export class PipePipe<U> implements PipeTransform {

  transform<T>(
    potentialObservable: null,
    operatorFn?: OperatorFunction<T, any>,
  ): null;
  transform<T>(
    potentialObservable: undefined,
    operatorFn?: OperatorFunction<T, any>,
  ): undefined;
  transform<T>(
    potentialObservable: Observable<T>,
    operatorFn?: OperatorFunction<T, any>,
  ): T;
  transform<T>(
    potentialObservable: Observable<T>,
    operatorFn?: OperatorFunction<T, U>,
  ): Observable<U> {
    return potentialObservable.pipe(operatorFn)
  }

}

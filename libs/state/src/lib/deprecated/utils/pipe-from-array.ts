import { noop, UnaryFunction } from 'rxjs';

/**
 * @deprecated moved to `@rx-angular/cdk/utils`
 * @see {@link https://www.npmjs.com/package/@rx-angular/cdk}
 */
export function pipeFromArray<T, R>(
  fns: Array<UnaryFunction<T, R>>
): UnaryFunction<T, R> {
  if (!fns) {
    return noop as UnaryFunction<any, any>;
  }

  if (fns.length === 1) {
    return fns[0];
  }

  return function piped(input: T): R {
    return fns.reduce(
      (prev: any, fn: UnaryFunction<T, R>) => fn(prev),
      input as any
    );
  };
}

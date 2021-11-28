import { OperatorFunction } from 'rxjs';
/**
 * @deprecated moved to `@rx-angular/cdk/utils`
 * @see {@link https://www.npmjs.com/package/@rx-angular/cdk}
 */
export function isPromiseGuard<T>(value: unknown): value is Promise<T> {
  return (
    value !== null &&
    value !== undefined &&
    typeof (<any>value).subscribe !== 'function' &&
    typeof (value as any).then === 'function'
  );
}

/**
 * @deprecated moved to `@rx-angular/cdk/utils`
 * @see {@link https://www.npmjs.com/package/@rx-angular/cdk}
 */
export function isOperateFnArrayGuard<T, R = T>(
  op: any[]
): op is OperatorFunction<T, R>[] {
  if (!Array.isArray(op)) {
    return false;
  }
  return op.length > 0 && op.every((i: any) => typeof i === 'function');
}

/**
 * @deprecated moved to `@rx-angular/cdk/utils`
 * @see {@link https://www.npmjs.com/package/@rx-angular/cdk}
 */
export function isStringArrayGuard(op: any[]): op is string[] {
  if (!Array.isArray(op)) {
    return false;
  }
  return op.length > 0 && op.every((i: any) => typeof i === 'string');
}

/**
 * @deprecated moved to `@rx-angular/cdk/utils`
 * @see {@link https://www.npmjs.com/package/@rx-angular/cdk}
 */
export function isIterableGuard<T>(obj: unknown): obj is Array<T> {
  if (obj === null || obj === undefined) {
    return false;
  }
  return typeof (obj as any)[Symbol.iterator] === 'function';
}

/**
 * @deprecated moved to `@rx-angular/cdk/utils`
 * @see {@link https://www.npmjs.com/package/@rx-angular/cdk}
 */
export function isKeyOf<O>(k: unknown): k is keyof O {
  const typeofK = typeof k;
  return (
    k !== null &&
    k !== undefined &&
    ['string', 'symbol', 'number'].includes(typeofK)
  );
}

/**
 * @deprecated moved to `@rx-angular/cdk/utils`
 * @see {@link https://www.npmjs.com/package/@rx-angular/cdk}
 */
export function isObjectGuard(obj: unknown): obj is object {
  return (
    obj !== null &&
    obj !== undefined &&
    typeof obj === 'object' &&
    !Array.isArray(obj)
  );
}

/**
 * @deprecated moved to `@rx-angular/cdk/utils`
 * @see {@link https://www.npmjs.com/package/@rx-angular/cdk}
 */
export function isDefined(val: unknown): val is NonNullable<any> {
  return val !== null && val !== undefined;
}

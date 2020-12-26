import { memo } from '../cdk/memoizerific';

export const memoFac = memo(500);
export const memoFnMap = new Map<Function, Function>();

export function getMemoizedFn(fn: any): Function  {
  if (memoFnMap.has(fn)) {
    return memoFnMap.get(fn);
  } else {
    const f = memoFac(fn)
    memoFnMap.set(fn, f);
    return f;
  }
}

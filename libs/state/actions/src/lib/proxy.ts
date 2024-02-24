import { ErrorHandler } from '@angular/core';
import { merge, OperatorFunction, Subject } from 'rxjs';

import { EffectMap, KeysOf, RxActions, SubjectMap, ValuesOf } from './types';

/**
 * @internal
 * Internal helper to create the proxy object
 * It lives as standalone function because we don't need to carrie it in memory for every ActionHandler instance
 * @param subjects
 * @param transforms
 */
export function actionProxyHandler<T extends object, U extends object>({
  subjectMap,
  transformsMap,
  effectMap,
  errorHandler = null,
}: {
  subjectMap: SubjectMap<T>;
  transformsMap?: U;
  effectMap: EffectMap<T>;
  errorHandler: ErrorHandler | null;
}): ProxyHandler<RxActions<T, U>> {
  type KeysOfT = KeysOf<T>;
  type ValuesOfT = ValuesOf<T>;

  function getEventEmitter(prop: KeysOfT): Subject<ValuesOfT> {
    if (!subjectMap[prop]) {
      subjectMap[prop] = new Subject<ValuesOfT>();
    }
    return subjectMap[prop];
  }
  function dispatch(value: ValuesOfT, prop: KeysOfT) {
    subjectMap[prop] = subjectMap[prop] || new Subject<ValuesOfT>();
    try {
      const val =
        transformsMap && (transformsMap as any)[prop]
          ? (transformsMap as any)[prop](value)
          : value;
      subjectMap[prop].next(val);
    } catch (err) {
      errorHandler?.handleError(err);
    }
  }
  return {
    // shorthand setter for multiple EventEmitter e.g. actions({propA: 1, propB: 2})
    apply(_: RxActions<T, U>, __: any, props: [T]): any {
      props.forEach((slice) =>
        Object.entries(slice).forEach(([k, v]) =>
          dispatch(v as any, k as any as KeysOfT)
        )
      );
    },
    get(_, property: string) {
      const prop = property as KeysOfT;

      // the user wants to get multiple or one single EventEmitter as observable `eventEmitter.prop$`
      if (prop.toString().split('').pop() === '$') {
        // the user wants to get multiple EventEmitter as observable `eventEmitter.$(['prop1', 'prop2'])`
        if (prop.toString().length === 1) {
          return (props: KeysOfT[]) =>
            merge(
              ...props.map((k) => {
                return getEventEmitter(k);
              })
            );
        }
        // the user wants to get a single EventEmitter as observable `eventEmitter.prop$`
        const propName = prop.toString().slice(0, -1) as KeysOfT;
        return getEventEmitter(propName);
      }

      // the user wants to get a single EventEmitter and trigger a side effect on event emission
      if (prop.toString().startsWith('on')) {
        // we need to first remove the 'on' from the the prop name
        const slicedPropName = prop.toString().slice(2);
        // now convert the slicedPropName to camelcase
        const propName = (slicedPropName.charAt(0).toLowerCase() +
          slicedPropName.slice(1)) as KeysOfT;
        return (
          behaviour: OperatorFunction<T[KeysOfT], T[KeysOfT]>,
          sf: (v: T[KeysOfT]) => void
        ) => {
          const sub = getEventEmitter(propName).pipe(behaviour).subscribe(sf);
          effectMap[propName] = sub;
          return () => sub.unsubscribe();
        };
      }

      // the user wants to get a dispatcher function to imperatively dispatch the EventEmitter
      return (args: ValuesOfT) => {
        dispatch(args, prop);
      };
    },
    set() {
      throw new Error('No setters available. To emit call the property name.');
    },
  };
}

import { ErrorHandler } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { KeysOf, RxActions, SubjectMap, ValuesOf } from './types';

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
  errorHandler = null,
}: {
  subjectMap: SubjectMap<T>;
  transformsMap?: U;
  errorHandler: ErrorHandler | null;
}): ProxyHandler<RxActions<T, U>> {
  type KeysOfT = KeysOf<T>;
  type ValuesOfT = ValuesOf<T>;

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
    // shorthand setter for multiple signals e.g. signals({propA: 1, propB: 2})
    apply(_: RxActions<T, U>, __: any, props: [T]): any {
      props.forEach((slice) =>
        Object.entries(slice).forEach(([k, v]) =>
          dispatch(v as any, k as any as KeysOfT)
        )
      );
    },
    get(_, property: string) {
      const prop = property as KeysOfT;

      // the user wants to get a single signal as observable
      if (prop.toString().split('').pop() === '$') {
        if (prop.toString().length === 1) {
          return (props: KeysOfT[]) =>
            merge(
              ...props.map((k) => {
                subjectMap[k] = subjectMap[k] || new Subject<ValuesOfT>();
                return subjectMap[k];
              })
            );
        }

        const propName = prop.toString().slice(0, -1) as KeysOfT;
        subjectMap[propName] = subjectMap[propName] || new Subject<ValuesOfT>();
        return subjectMap[propName];
      }

      // the user wants to get a dispatcher function
      return (args: ValuesOfT) => {
        dispatch(args, prop);
      };
    },
    set() {
      throw new Error('No setters available. To emit call the property name.');
    },
  };
}

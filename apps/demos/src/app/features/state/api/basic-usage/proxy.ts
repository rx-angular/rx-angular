/**
 * @internal
 * Internal helper to create the proxy object
 * It lifes as standalone function because we dont need to carrie it in memory for every ActionHandler instance
 * @param subjects
 * @param transforms
 */
import { merge, Subject } from 'rxjs';
import { KeysOf, ValuesOf, RxState } from './types';
import { ErrorHandler } from '@angular/core';
import { RxState as RxS } from '@rx-angular/state';
import { Observable } from 'rxjs';

export function actionProxyHandler<T extends object>(
  state: RxS<T>,
  errorHandler?: ErrorHandler
): ProxyHandler<RxState<T>> {
  type KeysOfT = KeysOf<T>;
  type ValuesOfT = ValuesOf<T>;

  type K = keyof T;
  return {
    // shorthand setter for multiple properties e.g. state({propA: 1, propB: 2})
    /*apply(_: RxState<T, U>, __: any, props: [T]): any {
      props.forEach((slice) =>
        Object.entries(slice).forEach(([k, v]) =>
          dispatch(v as any, k as any as KeysOfT)
        )
      );
    },*/
    // any state.<prop> access
    get(_, property: string) {
      const prop = property as KeysOfT;
      console.log(`[L]: get state.${prop} access`);
      if (
        prop === 'set' ||
        prop === 'get' ||
        prop === 'select' ||
        prop === 'connect'
      ) {
        console.log(`[L]: get state.${prop} with arg`);

        return (...arg) => {
          return state[property](...arg);
        };
      }

      // the user wants to get all values as observable
      // @example
      // state.$
      if (prop === '$') {
        console.log(`[L]: get the full obj with any change (state.$)`);
        throw new Error('state.$ is not implemented');
        /* return (props: KeysOfT[]) => merge(
            ...props.map((k) => {
              subjects[k] = subjects[k] || new Subject<ValuesOfT>();
              return subjects[k];
            })
          );*/
        return state.select();
      }

      // the user wants to get a single signal as observable
      // @example
      // state.propA$
      if (prop.toString().endsWith('$')) {
        console.log(`[L]: get prop val changes as observable (state.prop1$)`);
        const propName = prop.toString().slice(0, -1) as KeysOfT;
        return state.select(propName);
      }

      // the user wants to connect a observable to a property
      // @example
      // state.$propA(propA$)
      if (prop.toString().startsWith('$')) {
        const propName = prop.toString().slice(1) as any;
        return (obs$: Observable<ValuesOf<KeysOfT>>): void => {
          console.log(
            `[L]: Connect observable val changes to prop (state.$${propName}(obs$))`
          );
          return state.connect(propName, obs$);
        };
      }

      // the user wants to get a property's value
      // @example
      // state.propA()
      console.log(`[L]: call of prop (state.${property}())`);
      return (...args: any[]) => {
        if (args.length) {
          console.log(`[L]: Set val of prop (state.${prop}(${args[0]}))`);
          state.set({ [prop]: args[0] } as any);
        }
        console.log(`[L]: Get val of prop (state.${prop})`);
        return state.get(prop);
      };
    },
    set(_: any, property: any, val: any) {
      const prop = property as KeysOfT;
      console.log(`[L]: Set called on (state.${property}(${val})`);
      // the user wants to get a property's value
      // @example
      state.set(prop, val);
      return true;
    },
  };
}

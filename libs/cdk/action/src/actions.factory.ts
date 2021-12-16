import { Subject } from 'rxjs';
import { KeysOf, ValuesOf } from '../../utils/src/lib/types';
import { ActionAccess, Actions } from './types';

/**
 * Returns a object based off of the provided typing with a separate setter `[prop](value: T[K]): void` and observable stream `[prop]$: Observable<T[K]>`;
 *
 * { search: string } => { search$: Observable<string>, search: (value: string) => void;}
 *
 * @example
 *
 * const actions = getActions<search: string, submit: void>({search: (e) => e.target.value});
 *
 * actions.search($event);
 * actions.search$ | async;
 *
 * @param transforms map of transform functions to apply on transformations to actions before emitting them.
 * This is very useful to clean up bloated template. e.g. `[input]="$event?.target?.value"` => `[input]="$event"`
 */
export function getActions<T extends Actions>(): ActionAccess<T> {
  const subjects = {} as { [K in keyof T]: Subject<T[K]> };

  const handler: ProxyHandler<ActionAccess<T>> = {
    get(_, property: string) {
      type KeysOfT = KeysOf<T>;
      type ValuesOfT = ValuesOf<T>;

      const prop = property as KeysOfT;

      if (prop.toString().split('').pop() === '$') {
        const propName = prop.toString().slice(0, -1) as KeysOfT;
        subjects[propName] = subjects[propName] || new Subject<ValuesOfT>();
        return subjects[propName];
      }

      return (args: ValuesOfT) => {
        subjects[prop] = subjects[prop] || new Subject<ValuesOfT>();
        subjects[prop].next(args);
      };
    },
    set() {
      throw new Error('No setters available. To emit call the property name.');
    },
  };

  return new Proxy({} as ActionAccess<T>, handler);
}

type UIActions = {
  search: string | number;
  toggle: boolean;
};

const actions = getActions<UIActions>();
actions.search('r');
actions.search(4);
// actions.search(false); // Error
actions.search$;
actions.toggle(true);
actions.toggle$;

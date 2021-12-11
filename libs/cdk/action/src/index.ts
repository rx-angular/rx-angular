import { map, Observable, Subject } from 'rxjs';

type InstanceOrType<T> = T extends abstract new (...args: unknown[]) => infer R ? R : T;

export type ActionAccess<T extends { [x: string]: any }> = {
  [K in keyof T]: (arg: InstanceOrType<T[K]>) => void;
} & {
  [K in Extract<keyof T, string> as `${K}$`]: Observable<T[K]>;
};

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
 * @param transforms map of transform functions to apply on certain properties if they are set.
 */
export function getActions<T extends object>(transforms?: Partial<{ [K in keyof T]: (e?: any) => T[K] }>): ActionAccess<T> {
  const _transforms = transforms !== undefined ? transforms : {} as any;
  const subjects: Record<string, Subject<T[keyof T]>> = {};

  const handler: ProxyHandler<ActionAccess<T>> = {
    get(_, property: string) {

      if (property.toString().split('').pop() === '$') {
        const propName: string | number | Symbol = property.toString().slice(0, -1);
        subjects[propName] =  subjects[propName] ||  new Subject<keyof T>()
        return subjects[propName].pipe(map((v) => (_transforms[propName] ? _transforms[propName](v) : v)));
      }

      return (args: T[keyof T]) => {
        subjects[property] =  subjects[property] ||  new Subject<keyof T>()
        subjects[property].next(args);
      };
    },
    set() {
      throw new Error('No setters available. To emit call the property name.');
    },
  };

  return new Proxy({} as ActionAccess<T>, handler);
}

import { map, Observable, Subject } from 'rxjs';

type InstanceOrType<T> = T extends abstract new (...args: unknown[]) => infer R ? R : T;

export type ActionAccess<T extends { [x: string]: any }> = {
  [K in keyof T]: (arg: InstanceOrType<T[K]>) => void;
} & {
  [K in Extract<keyof T, string> as `${K}$`]: Observable<InstanceOrType<T[K]>>;
};

export type actionTransformFn<I, O> = (value: I) => O;

export type actionTransforms<T> = { [K in keyof T]: actionTransformFn<unknown, T[K]> };

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
export function getActions<T extends object>(transforms?: Partial<actionTransforms<T>>): ActionAccess<T> {
  const _transforms = transforms !== undefined ? transforms : {} as Partial<actionTransforms<T>>;
  const subjects = {} as { [K in keyof T]: Subject<T[K]> };

  const handler: ProxyHandler<ActionAccess<T>> = {
    get(_, property: string) {
      const prop = property as keyof T;

      if (prop.toString().split('').pop() === '$') {
        const propName = prop.toString().slice(0, -1) as keyof T;
        subjects[propName] =  subjects[propName] ||  new Subject<T[keyof T]>()
        return subjects[propName].pipe(map((v) => (_transforms[propName] ? _transforms[propName](v) : v)));
      }

      return (args: T[keyof T]) => {
        subjects[prop] =  subjects[prop] ||  new Subject<T[keyof T]>()
        subjects[prop].next(args);
      };
    },
    set() {
      throw new Error('No setters available. To emit call the property name.');
    },
  };

  return new Proxy({} as ActionAccess<T>, handler);
}

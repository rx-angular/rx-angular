import { map, Observable, Subject } from 'rxjs';

type InstanceOrType<T> = T extends abstract new (...args: unknown[]) => infer R ? R : T;

type UiInteractions<T extends { [x: string]: any }> = {
  [K in keyof T]: (arg: InstanceOrType<T[K]>) => void;
} & {
  [K in Extract<keyof T, string> as `${K}$`]: Observable<T[K]>;
};

export function getActions<T extends object>(transforms?: Partial<{ [K in keyof T]: (e?: any) => T[K] }>): UiInteractions<T> {
  transforms = transforms || {};
  const subjects: Subject<T[keyof T]>[] = [];

  const handler: ProxyHandler<UiInteractions<T>> = {
    get(target, property) {

      if (property.toString().split('').pop() === '$') {
        const propName = property.toString().slice(0, -1);
        subjects[propName] =  subjects[propName] ||  new Subject<keyof T>()
        return subjects[propName].pipe(map((v) => (transforms[propName] ? transforms[propName](v) : v)));
      }

      return (args: T[keyof T]) => {
        subjects[property] =  subjects[property] ||  new Subject<keyof T>()
        subjects[property].next(args);
      };
    },
    set(target, property, vale) {
      throw new Error('No setters available. To emit call the property name.');
    },
  };

  return new Proxy({} as UiInteractions<T>, handler);
}

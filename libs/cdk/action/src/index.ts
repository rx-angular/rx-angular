import { map, Subject } from 'rxjs';

type InstanceOrType<T> = T extends abstract new(...args: unknown[]) => infer R ? R : T;

type UiInteractions<T extends { [x: string]: any}> = {
  [K in keyof T]: (arg: InstanceOrType<T[K]>) => void;
} & {
  [K in Extract<keyof T, string> as `${K}$`]: {
    subscribe(arg: Function): any
  }
}

export function getActions<T extends object>(): UiInteractions<T>{
  const subject = new Subject<Partial<T>>();

  const handler = {
    get(target, property) {
      const propName = property.toString().slice(0, -1);

      if(property.toString().split('').pop() === '$') {
        return subject.pipe(
          map(t => t[propName])
        )
      }

      return (args?) => {
        subject.next({ [property]: args } as Partial<T>);
      }
    },
    set(target, property, vale) {
      throw new Error('No setters available. To emit call the property name.');
    }
  }

  return new Proxy({}, handler) as UiInteractions<T>;
}

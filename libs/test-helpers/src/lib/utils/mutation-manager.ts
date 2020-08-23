// @TODO use better solution to type that
interface AnyObject {
  [prop: string]: any;
}
export function mutationManagerFactory<T>(obj: AnyObject, props: AnyObject) {
  const originals: AnyObject = Object.entries(props).reduce(
    (
      originalObj: AnyObject,
      [prop, defaultValue]: [string, any]
    ): AnyObject => {
      return {
        ...originalObj,
        [prop]: obj.hasOwnProperty(prop) ? obj[prop] : defaultValue,
      };
    },
    {}
  );

  return {
    restore: () => {
      Object.entries(originals).forEach(([prop, value]) => {
        obj[prop] = value;
      });
    },
    set: (prop: string, value: any) => {
      obj[prop] = value;
    },
  };
}

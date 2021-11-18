interface CoalescingContextProps extends Record<string, unknown> {
  numCoalescingSubscribers: number;
}

export interface CoalescingManager {
  remove: (scope: Record<string, unknown>) => void;
  add: (scope: Record<string, unknown>) => void;
  isCoalescing: (scope: Record<string, unknown>) => boolean;
}

export const coalescingManager: CoalescingManager = createCoalesceManager();
type KeyOf<O> = keyof O;
type ValueOf<O> = O[keyof O];
function hasKey<O>(ctx: O, property: KeyOf<O>): ctx is O {
  return ctx[property] != null;
}
/*
 * createPropertiesWeakMap
 *
 * @param getDefaults: (o: O) => P
 * Example:
 *
 * export interface Properties {
 *   isCoalescing: boolean;
 * }
 *
 * const obj: object = {
 *   foo: 'bar',
 *   isCoalescing: 'weakMap version'
 * };
 *
 * const getDefaults = (ctx: object): Properties => ({isCoalescing: false});
 * const propsMap = createPropertiesWeakMap<object, Properties>(getDefaults);
 *
 * console.log('obj before:', obj);
 * // {foo: "bar", isCoalescing: "weakMap version"}
 * console.log('props before:', propsMap.getProps(obj));
 * // {isCoalescing: "weakMap version"}
 *
 * propsMap.setProps(obj, {isCoalescing: true});
 * console.log('obj after:', obj);
 * // {foo: "bar", isCoalescing: "weakMap version"}
 * console.log('props after:', propsMap.getProps(obj));
 * // {isCoalescing: "true"}
 * */
function createPropertiesWeakMap<
  O extends Record<string, unknown>,
  P extends O
>(getDefaults: (o: O) => P) {
  type K = KeyOf<P>;
  const propertyMap = new WeakMap<O, P>();

  return {
    getProps: getProperties,
    setProps: setProperties,
  };

  function getProperties(ctx: O): P {
    const defaults = getDefaults(ctx);
    const propertiesPresent: P | undefined = propertyMap.get(ctx);
    let properties: P;

    if (propertiesPresent !== undefined) {
      properties = propertiesPresent as P;
    } else {
      properties = {} as P;

      (Object.entries(defaults) as unknown[]).forEach(
        ([prop, value]: [KeyOf<P>, ValueOf<P>]): void => {
          if (hasKey(ctx as P, prop)) {
            properties[prop] = (ctx as P)[prop];
          } else {
            properties[prop] = value;
          }
        }
      );

      propertyMap.set(ctx, properties);
    }
    return properties;
  }

  function setProperties(ctx: O, props: Partial<P>): P {
    const properties: P = getProperties(ctx);
    (Object.entries(props) as [K, P[K]][]).forEach(([prop, value]) => {
      properties[prop] = value;
    });
    propertyMap.set(ctx, properties);
    return properties;
  }
}

const coalescingContextPropertiesMap = createPropertiesWeakMap<
  Record<string, unknown>,
  CoalescingContextProps
>((ctx) => ({
  numCoalescingSubscribers: 0,
}));
/**
 * @describe createCoalesceManager
 *
 * returns a
 * Maintains a weak map of component references ans flags
 * them if the coalescing process is already started for them.
 *
 * Used in render aware internally.
 */
function createCoalesceManager(): CoalescingManager {
  return {
    remove: removeWork,
    add: addWork,
    isCoalescing,
  };

  // Increments the number of subscriptions in a scope e.g. a class instance
  function removeWork(scope: Record<string, unknown>): void {
    const numCoalescingSubscribers =
      coalescingContextPropertiesMap.getProps(scope).numCoalescingSubscribers -
      1;
    coalescingContextPropertiesMap.setProps(scope, {
      numCoalescingSubscribers:
        numCoalescingSubscribers >= 0 ? numCoalescingSubscribers : 0,
    });
  }

  // Decrements the number of subscriptions in a scope e.g. a class instance
  function addWork(scope: Record<string, unknown>): void {
    const numCoalescingSubscribers =
      coalescingContextPropertiesMap.getProps(scope).numCoalescingSubscribers +
      1;
    coalescingContextPropertiesMap.setProps(scope, {
      numCoalescingSubscribers,
    });
  }

  // Checks if anybody else is already coalescing atm
  function isCoalescing(scope: Record<string, unknown>): boolean {
    return (
      coalescingContextPropertiesMap.getProps(scope).numCoalescingSubscribers >
      0
    );
  }
}

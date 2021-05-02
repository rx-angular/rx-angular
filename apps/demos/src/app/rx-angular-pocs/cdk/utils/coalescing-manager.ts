import { createPropertiesWeakMap } from './properties-weakmap';

interface CoalescingContextProps {
  numCoalescingSubscribers: number;
}

interface CoalescingManager {
  decrement: (scope: object) => void,
  increment: (scope: object) => void,
  isCoalescing: (scope: object) => boolean,
}

export const coalescingManager = createCoalesceManager();

const coalescingContextPropertiesMap = createPropertiesWeakMap<object,
  CoalescingContextProps>((ctx) => ({
  numCoalescingSubscribers: 0
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
    decrement,
    increment,
    isCoalescing
  };

  // Decrements the number of subscriptions in a scope e.g. a class instance
  function decrement(scope: object): void {
    const numCoalescingSubscribers = coalescingContextPropertiesMap
      .getProps(scope).numCoalescingSubscribers - 1;
    coalescingContextPropertiesMap
      .setProps(scope, { numCoalescingSubscribers: numCoalescingSubscribers >= 0 ? numCoalescingSubscribers : 0 });
  }

  // Increments the number of subscriptions in a scope e.g. a class instance
  function increment(scope: object): void {
    const numCoalescingSubscribers =
      coalescingContextPropertiesMap
        .getProps(scope).numCoalescingSubscribers + 1;
    coalescingContextPropertiesMap
      .setProps(scope, { numCoalescingSubscribers });
  }

  // Checks if anybody else is already coalescing atm (number > 0)
  function isCoalescing(scope: object): boolean {
    return (
      coalescingContextPropertiesMap
        .getProps(scope).numCoalescingSubscribers > 0
    );
  }
}

import { createPropertiesWeakMap } from '../utils';

interface CoalescingContextProps {
  numCoalescingSubscribers: number;
}

export const coalescingManager = createCoalesceManager();

const coalescingContextPropertiesMap = createPropertiesWeakMap<
  object,
  CoalescingContextProps
>(ctx => ({
  numCoalescingSubscribers: 0
}));

function createCoalesceManager(): {
  remove: (scope: object) => void;
  add: (scope: object) => void;
  isCoalescing: (scope: object) => boolean;
} {
  return {
    remove: removeWork,
    add: addWork,
    isCoalescing
  };

  // Increments the number of subscriptions in a scope e.g. a class instance
  function removeWork(scope: object = {}): void {
    const numCoalescingSubscribers =
      coalescingContextPropertiesMap.getProps(scope).numCoalescingSubscribers -
      1;
    coalescingContextPropertiesMap.setProps(scope, {
      numCoalescingSubscribers
    });
  }

  // Decrements the number of subscriptions in a scope e.g. a class instance
  function addWork(scope: object = {}): void {
    const numCoalescingSubscribers =
      coalescingContextPropertiesMap.getProps(scope).numCoalescingSubscribers +
      1;
    coalescingContextPropertiesMap.setProps(scope, {
      numCoalescingSubscribers
    });
  }

  // Checks if anybody else is already coalescing atm
  function isCoalescing(scope: object = {}): boolean {
    return (
      coalescingContextPropertiesMap.getProps(scope).numCoalescingSubscribers >
      0
    );
  }
}

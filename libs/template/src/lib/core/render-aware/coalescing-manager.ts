import { createPropertiesWeakMap } from '../utils';

interface CoalescingContextProps {
  numCoalescingSubscribers: number;
}

const coalescingContextPropertiesMap = createPropertiesWeakMap<
  object,
  CoalescingContextProps
>(ctx => ({
  numCoalescingSubscribers: 0
}));

export function createCoalesceManager(
  scope: object = {}
): {
  remove: () => void;
  add: () => void;
  isCoalescing: () => boolean;
} {
  return {
    remove: removeSubscriber,
    add: addSubscription,
    isCoalescing
  };

  // Increments the number of subscriptions in a scope e.g. a class instance
  function removeSubscriber(): void {
    const numCoalescingSubscribers =
      coalescingContextPropertiesMap.getProps(scope).numCoalescingSubscribers -
      1;
    coalescingContextPropertiesMap.setProps(scope, {
      numCoalescingSubscribers
    });
  }

  // Decrements the number of subscriptions in a scope e.g. a class instance
  function addSubscription(): void {
    const numCoalescingSubscribers =
      coalescingContextPropertiesMap.getProps(scope).numCoalescingSubscribers +
      1;
    coalescingContextPropertiesMap.setProps(scope, {
      numCoalescingSubscribers
    });
  }

  // Checks if anybody else is already coalescing atm
  function isCoalescing(): boolean {
    return (
      coalescingContextPropertiesMap.getProps(scope).numCoalescingSubscribers >
      0
    );
  }
}

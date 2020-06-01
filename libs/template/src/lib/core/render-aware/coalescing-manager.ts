import { createPropertiesWeakMap } from '@rx-angular/template';

interface CoalescingContextProps {
  numCoalescingSubscribers: number;
}

const coalescingContextPropertiesMap = createPropertiesWeakMap<
  object,
  CoalescingContextProps
>((ctx) => ({
  numCoalescingSubscribers: 0,
}));

export function createCoalesceManager(
  scope: object
): {
  remove: () => void;
  add: () => void;
  isCoalescing: () => boolean;
} {
  const _scope = scope;
  return {
    remove: removeCoalesceSubscriber,
    add: addCoalescingSubscription,
    isCoalescing,
  };

  // Handles the coalescing relate to a scope e.g. a class instance
  function removeCoalesceSubscriber(): void {
    const numCoalescingSubscribers =
      coalescingContextPropertiesMap.getProps(_scope).numCoalescingSubscribers -
      1;
    coalescingContextPropertiesMap.setProps(_scope, {
      numCoalescingSubscribers,
    });
  }

  // Handles the coalescing relate to a scope e.g. a class instance
  function addCoalescingSubscription(): void {
    const numCoalescingSubscribers =
      coalescingContextPropertiesMap.getProps(_scope).numCoalescingSubscribers +
      1;
    coalescingContextPropertiesMap.setProps(_scope, {
      numCoalescingSubscribers,
    });
  }

  // checks if anybody is already coalescing atm
  function isCoalescing(): boolean {
    return (
      coalescingContextPropertiesMap.getProps(_scope).numCoalescingSubscribers >
      0
    );
  }
}

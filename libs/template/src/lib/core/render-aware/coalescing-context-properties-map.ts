import { createPropertiesWeakMap } from '../utils/properties-weakmap';

export interface CoalescingContextProps {
  isCoalescing: boolean;
}

export const coalescingContextPropertiesMap = createPropertiesWeakMap<
  object,
  CoalescingContextProps
>((ctx) => ({
  isCoalescing: false,
}));

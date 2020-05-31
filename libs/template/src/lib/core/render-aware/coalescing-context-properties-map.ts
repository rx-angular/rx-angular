import { createPropertiesWeakMap } from '../utils/properties-weakmap';

export interface CoalescingContextProps {
  instances: any[];
}

export const coalescingContextPropertiesMap = createPropertiesWeakMap<
  object,
  CoalescingContextProps
>((ctx) => ({
  instances: [],
}));

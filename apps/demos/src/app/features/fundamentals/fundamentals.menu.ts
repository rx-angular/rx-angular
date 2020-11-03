import { RENDERCALLBACK_MENU } from './render-callback/render-callback.menu';

export const FUNDAMENTALS_MENU = [
  {
    link: 'nested-vs-injected',
    label: 'Nested vs Projected'
  },
  {
    link: 'passing-values',
    label: 'Passing Values'
  },
  {
    link: 'zone-patched-apis',
    label: 'Zone Patched APIs'
  },
  {
    label: 'Scheduling',
    link: 'scheduling'
  },
  {
    label: 'Coalescing',
    link: 'coalescing'
  },
  {
    label: 'Zone Flags',
    link: 'zone-flags'
  },
  ...RENDERCALLBACK_MENU
];

import { MENU_ITEMS as RX_LET_MENU_ITEMS } from './examples/rx-let/rx-let.menu';
import { MENU_ITEMS as UNPATCH_MENU_ITEMS } from './examples/unpatch/unpatch.menu';
import { MENU_ITEMS as PUSH_MENU_ITEMS } from './examples/push/push.menu';
import { MENU_ITEMS as STRATEGIES_MENU_ITEMS } from './examples/strategies/strategies.menu';
import { MENU_ITEMS as VIEWPORT_PRIO_MENU_ITEMS } from './examples/viewport-prio/viewport-prio.menu';

export const MENU_ITEMS = [
  {
    label: 'Push',
    link: 'push',
    children: PUSH_MENU_ITEMS,
  },
  {
    label: '*rxLet',
    link: 'rx-let',
    children: RX_LET_MENU_ITEMS,
  },
  {
    label: 'Strategies',
    link: 'strategies',
    children: STRATEGIES_MENU_ITEMS,
  },
  {
    label: 'Unpatch',
    link: 'unpatch',
    children: UNPATCH_MENU_ITEMS,
  },
  {
    label: 'ViewPort Prio',
    link: 'view-port-prio',
    children: VIEWPORT_PRIO_MENU_ITEMS,
  }
];

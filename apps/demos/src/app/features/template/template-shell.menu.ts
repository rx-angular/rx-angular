import { MENU_ITEMS as PUSH_MENU_ITEMS } from './push/push.menu';
import { MENU_ITEMS as RX_LET_MENU_ITEMS } from './rx-let/rx-let.menu';
import { MENU_ITEMS as STRATEGIES_MENU_ITEMS } from './strategies/strategies.menu';
import { MENU_ITEMS as UNPATCH_MENU_ITEMS } from './unpatch/unpatch.menu';
import {
  MENU_ITEMS as VIEWPORT_PRIO_MENU_ITEMS
} from './viewport-prio/viewport-prio.menu';

export const TEMPLATE_MENU = [
  {
    label: 'Strategies',
    link: 'strategies',
    children: STRATEGIES_MENU_ITEMS,
  },
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

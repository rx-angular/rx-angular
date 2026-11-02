import { PUSH_PIPE_MENU } from './push/push.menu';
import { MENU_ITEMS as RX_FOR_MENU_ITEMS } from './rx-for/rx-for.menu';
import { MENU_ITEMS as RX_LET_MENU_ITEMS } from './rx-let/rx-let.menu';
import { RX_VIRTUAL_FOR_MENU_ITEMS } from './rx-virtual-for/rx-virtual-for.menu';
import { MENU_ITEMS as STRATEGY_MENU_ITEMS } from './strategies/concurrent-strategies.menu';

export const TEMPLATE_MENU = [
  {
    label: '*rxLet',
    link: 'rx-let',
    children: RX_LET_MENU_ITEMS,
  },
  {
    label: '*rxIf',
    link: 'rx-if',
  },
  {
    label: '*rxFor',
    link: 'rx-for',
    children: RX_FOR_MENU_ITEMS,
  },
  {
    label: 'Virtual Scrolling',
    link: 'rx-virtual-for',
    children: RX_VIRTUAL_FOR_MENU_ITEMS,
  },
  {
    label: 'push',
    link: 'push',
    children: PUSH_PIPE_MENU,
  },
  {
    label: 'Virtual Views',
    link: 'virtual-view',
    // children: VIRTUAL_VIEW_MENU_ITEMS,
  },
  {
    label: 'Strategies',
    link: 'strategies',
    children: STRATEGY_MENU_ITEMS,
  },
  {
    link: 'render-callback',
    label: 'Render Callback',
  },
];

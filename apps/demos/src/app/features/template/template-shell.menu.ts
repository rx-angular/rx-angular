import { MENU_ITEMS as RX_LET_MENU_ITEMS } from './rx-let/rx-let.menu';;
import { MENU_ITEMS as VIEWPORT_PRIO_MENU_ITEMS } from './viewport-prio/viewport-prio.menu';

export const TEMPLATE_MENU = [
  {
    label: 'Push',
    link: 'push/basic-example'
  },
  {
    label: '*rxLet',
    link: 'rx-let',
    children: RX_LET_MENU_ITEMS,
  },
  {
    link: 'render-callback',
    label: 'Render Callback'
  },
  {
    label: 'Unpatch',
    link: 'unpatch'
  },
  {
    label: 'ViewPort Prio',
    link: 'view-port-prio',
    children: VIEWPORT_PRIO_MENU_ITEMS,
  }
];

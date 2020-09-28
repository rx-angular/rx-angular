import { MENU_ITEMS as RX_LET_MENU_ITEMS } from '../examples/template/rx-let/rx-let.menu';
import { MENU_ITEMS as UNPATCH_MENU_ITEMS } from '../examples/template/unpatch/unpatch.menu';
import { MENU_ITEMS as PUSH_MENU_ITEMS } from '../examples/template/push/push.menu';
import { MENU_ITEMS as STRATEGIES_MENU_ITEMS } from '../examples/template/strategies/strategies.menu';
import { MENU_ITEMS as VIEWPORT_PRIO_MENU_ITEMS } from '../examples/template/viewport-prio/viewport-prio.menu';
import { MENU_ITEMS as DEMO_BASICS_MENU_ITEMS } from '../tutorials/demo-basics/demo-basics.menu';

export const TEMPLATE_MENU_ITEMS = [
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

export const TUTORIALS_MENU_ITEMS = [
  {
    label: 'Basics',
    link: 'basics',
    children: DEMO_BASICS_MENU_ITEMS,
  }
];

export const SHOWCASES_MENU_ITEMS = [
  {
    label: 'Dynamic Counter',
    link: 'dynamic-counter',
  }
];


export const MENU_ITEMS = [
  {
    label: 'Template',
    link: 'template',
    children: TEMPLATE_MENU_ITEMS
  },
  {
    label: 'Tutorials',
    link: 'tutorials',
    children: TUTORIALS_MENU_ITEMS
  },
  {
    label: 'Showcases',
    link: 'showcases',
    children: SHOWCASES_MENU_ITEMS
  }
];

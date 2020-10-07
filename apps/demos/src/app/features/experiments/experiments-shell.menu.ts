import { MENU_ITEMS as RX_STATE_MENU_ITEMS } from './state/rx-state.menu';
import { STRATEGIES_MENU } from './strategies/strategies.menu';
import { MENU_ITEMS as EMBEDDED_VIEW_MENU } from './cd-embedded-view/cd-embedded-view.menu';
import { RXLET_VS_PUSH_MENU_ITEMS } from './rx-let-vs-push/rx-let-vs-push.menu';
import { MENU_ITEMS as DIFFER_MENU_ITEMS } from './differ/differ.menu';

export const EXPERIMENTS_MENU = [
  ...RXLET_VS_PUSH_MENU_ITEMS,
  ...EMBEDDED_VIEW_MENU,
  ...DIFFER_MENU_ITEMS,
  ...RX_STATE_MENU_ITEMS,
  ...STRATEGIES_MENU
];


import { MENU_ITEMS as CD_MENU_ITEMS } from './fundamentals/cd/cd.menu';
import { MENU_ITEMS as MIXED_MENU_ITEMS } from './template/mixed/mixed.menu';
import { MENU_ITEMS as RX_STATE_MENU_ITEMS } from './state/rx-state.menu';
import { STRATEGIES_MENU } from './strategies/strategies.menu';
import { MENU_ITEMS as EMBEDDED_VIEW_MENU } from './template/cd-embedded-view/cd-embedded-view.menu';

export const MENU_ITEMS = [
  ...CD_MENU_ITEMS,
  ...MIXED_MENU_ITEMS,
  ...RX_STATE_MENU_ITEMS,
  ...STRATEGIES_MENU,
  ...EMBEDDED_VIEW_MENU
];

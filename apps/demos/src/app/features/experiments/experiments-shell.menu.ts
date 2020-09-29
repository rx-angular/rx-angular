import { MENU_ITEMS as CD_MENU_ITEMS } from './fundamentals/change-detection/change-detection.menu';
import { MENU_ITEMS as RX_STATE_MENU_ITEMS } from './state/rx-state.menu';
import { STRATEGIES_MENU } from './strategies/strategies.menu';
import { MENU_ITEMS as EMBEDDED_VIEW_MENU } from './cd-embedded-view/cd-embedded-view.menu';

export const EXPERIMENTS_MENU = [
  ...CD_MENU_ITEMS,
  ...RX_STATE_MENU_ITEMS,
  ...STRATEGIES_MENU,
  ...EMBEDDED_VIEW_MENU
];

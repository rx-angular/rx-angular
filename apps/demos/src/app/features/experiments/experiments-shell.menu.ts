import { MENU_ITEMS as RX_STATE_MENU_ITEMS } from './state/rx-state.menu';
import { STRATEGIES_MENU } from './strategies/strategies.menu';
import { MENU_ITEMS as STRUCTURAL_DIRECTIVES } from './structural-directives/structural-directives.menu';
import { RXLET_VS_PUSH_MENU_ITEMS } from './rx-let-vs-push/rx-let-vs-push.menu';
import { ALPHAS_COMPARE_MENU_ITEMS } from './alphas-compare/alphas-compare.menu';
import { MENU_ITEMS as DIFFER_MENU_ITEMS } from './differ/differ.menu';

export const EXPERIMENTS_MENU = [
  {
    link: 'structural-directives',
    label: 'Structural Directives',
    children: STRUCTURAL_DIRECTIVES,
  },
  ...DIFFER_MENU_ITEMS,
  ...RX_STATE_MENU_ITEMS,
  ...STRATEGIES_MENU,
  ...RXLET_VS_PUSH_MENU_ITEMS,
  ...ALPHAS_COMPARE_MENU_ITEMS,
];

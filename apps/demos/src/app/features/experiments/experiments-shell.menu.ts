import { DECORATORS_MENU_ITEMS } from './decorators/decorators.menu';
import { MENU_ITEMS as RX_STATE_MENU_ITEMS } from './state/rx-state.menu';
import { MENU_ITEMS as STRUCTURAL_DIRECTIVES } from './structural-directives/structural-directives.menu';
import { MENU_ITEMS as DIFFER_MENU_ITEMS } from './differ/differ.menu';
import { MENU_ITEMS as STRATEGIES_MENU_ITEMS } from './strategies/strategies.menu';
import { MENU_ITEMS as PIPES_MENU_ITEMS } from './pipes/pipes.menu';
import { MENU_ITEMS as INPUT_MENU_ITEMS } from './input-bindings/input-bindings.menu';

export const EXPERIMENTS_MENU = [
  {
    label: 'Differ',
    link: 'differ',
    children: DIFFER_MENU_ITEMS,
  },
  {
    label: 'Strategies',
    link: 'strategies',
    children: STRATEGIES_MENU_ITEMS,
  },
  {
    label: 'Pipes',
    link: 'pipes',
    children: PIPES_MENU_ITEMS,
  },
  {
    link: 'structural-directives',
    label: 'Structural Directives',
    children: STRUCTURAL_DIRECTIVES,
  },
  ...RX_STATE_MENU_ITEMS,
  ...INPUT_MENU_ITEMS,
  {
    link: 'decorators',
    label: 'decorators',
    children: DECORATORS_MENU_ITEMS
  }
];

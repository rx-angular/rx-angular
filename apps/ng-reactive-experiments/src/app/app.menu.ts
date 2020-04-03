import {MenuItem} from '@navigation';
import {MENU_ITEMS as PERFORMANCE_MENU_ITEMS} from './performance/performance.menu';
import {MENU_ITEMS as CD_MENU_ITEMS} from './cd/cd.menu';
import {MENU_ITEMS as PUSH_MENU_ITEMS} from './push/push.menu';
import {MENU_ITEMS as LET_MENU_ITEMS} from './let/let.menu';
import {MENU_ITEMS as MIXED_MENU_ITEMS} from './mixed/mixed.menu';
import {MENU_ITEMS as DRAFT_MENU_ITEMS} from './draft/draft.menu';
import {MENU_ITEMS as CD_OPERATORS_MENU_ITEMS} from './cd-operators/cd-operators.menu';
import {MENU_ITEMS as RX_STATE_MENU_ITEMS} from './rx-state/rx-state.menu';

export const MENU_ITEMS: MenuItem[] = [
    ...DRAFT_MENU_ITEMS,
    ...CD_MENU_ITEMS,
    ...PUSH_MENU_ITEMS,
    ...LET_MENU_ITEMS,
    ...MIXED_MENU_ITEMS,
    ...PERFORMANCE_MENU_ITEMS,
    ...CD_OPERATORS_MENU_ITEMS,
    ...RX_STATE_MENU_ITEMS
];

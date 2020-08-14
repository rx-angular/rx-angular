import { MenuItem } from '../core/navigation/menu-item.interface';

import { MENU_ITEMS as PERFORMANCE_1_MENU_ITEMS } from './performance-01/performance-01.menu';
import { MENU_ITEMS as PERFORMANCE_2_MENU_ITEMS } from './performance-02/performance-02.menu';
import { MENU_ITEMS as PERFORMANCE_3_MENU_ITEMS } from './performance-03/performance-03.menu';
import { MENU_ITEMS as PERFORMANCE_4_MENU_ITEMS } from './performance-04/performance-04.menu';

export const MENU_ITEMS: MenuItem[] = [
  ...PERFORMANCE_1_MENU_ITEMS,
  ...PERFORMANCE_2_MENU_ITEMS,
  ...PERFORMANCE_3_MENU_ITEMS,
  ...PERFORMANCE_4_MENU_ITEMS,
];

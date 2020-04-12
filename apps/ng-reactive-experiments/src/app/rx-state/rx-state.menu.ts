import { MenuItem } from '../core/navigation/menu-item.interface';

export const MENU_ITEMS: MenuItem[] = [
  {
    link: 'rx-state',
    label: 'RxState Overview',
    children: [
      // 01.
      {
        link: 'rx-state-01',
        label: 'RxState 01'
      }
    ]
  }
];

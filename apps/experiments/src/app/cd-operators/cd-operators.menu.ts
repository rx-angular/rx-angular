import { MenuItem } from '../core/navigation/menu-item.interface';

export const MENU_ITEMS: MenuItem[] = [
  {
    link: 'cd-operators',
    label: 'CD Operators',
    children: [
      // 01.
      {
        link: 'cd-operators-01',
        label: 'CD Operators 01',
      },
    ],
  },
];

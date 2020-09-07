import { MenuItem } from '../core/navigation/menu-item.interface';

export const MENU_ITEMS: MenuItem[] = [
  {
    link: 'for-poc',
    label: 'RxFor Poc',
    children: [
      // 01.
      {
        link: 'for-poc/basic',
        label: 'RxFor Basic PoC',
      },
      {
        link: 'for-poc/advanced',
        label: 'RxFor Advanced PoC',
      }
    ],
  },
];

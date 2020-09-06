import { MenuItem } from '../core/navigation/menu-item.interface';

export const MENU_ITEMS: MenuItem[] = [
  {
    link: 'embedded-view',
    label: 'CD Embedded View',
    children: [
      // 01.
      {
        link: 'embedded-view/cd-embedded-view-01',
        label: 'embedded-view/CD embedded-view 01',
      },
    ],
  },
];

import { MenuItem } from '../../core/navigation/menu-item.interface';

export const MENU_ITEMS: MenuItem[] = [
  {
    link: 'mixed',
    label: 'Mixed Setup Overview',
    children: [
      // 01.
      {
        link: 'mixed-01',
        label: 'Mixed Setup 01',
      },
      // 02.
      {
        link: 'mixed-02',
        label: 'Mixed Setup 02',
      },
    ],
  },
];

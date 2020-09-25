import { MenuItem } from '../../core/navigation/menu-item.interface';

export const MENU_ITEMS: MenuItem[] = [
  {
    link: 'let',
    label: 'Let Directive Overview',
    children: [
      {
        link: 'let-01',
        label: 'Let Directive 01',
      },
      {
        link: 'let-02',
        label: 'Let Directive 02',
      },
      {
        link: 'let-03',
        label: 'Let Directive 03',
      },
      {
        link: 'let-11',
        label: 'Let Directive 11',
      },
      {
        link: 'let-12',
        label: 'Let Directive 12',
      },
    ],
  },
];

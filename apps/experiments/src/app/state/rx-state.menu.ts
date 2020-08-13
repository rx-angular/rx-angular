import { MenuItem } from '../core/navigation/menu-item.interface';

export const MENU_ITEMS: MenuItem[] = [
  {
    link: 'rx-base-state',
    label: 'RxState Overview',
    children: [
      {
        link: 'subscription',
        label: 'Subscription',
      },
      {
        link: 'composition',
        label: 'Composition',
      },
      {
        link: 'selections',
        label: 'Selections',
      },
      {
        link: 'connect',
        label: 'Connecting',
      },
      {
        link: 'selectslice',
        label: 'SelectSlice',
      },
    ],
  },
];

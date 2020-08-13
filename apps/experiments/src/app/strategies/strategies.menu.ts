import { MenuItem } from '../core/navigation/menu-item.interface';

export const STRATEGIES_MENU: MenuItem[] = [
  {
    link: 'strategies',
    label: 'Strategies Overview',
    children: [
      // 01. One single-shot observable bound by one push as template expression
      {
        link: 'strategies/virtual-scroll',
        label: 'Virtual Scroll',
      },
      {
        link: 'strategies/local01',
        label: 'Local 01',
      },
    ],
  },
];

import { MenuItem } from '../core/navigation/menu-item.interface';

export const MENU_ITEMS: MenuItem[] = [
  {
    link: 'render-callback',
    label: 'Render Callback',
    children: [
      // 01. One single-shot observable bound by one push as template expression
      {
        link: 'render-callback/render-callback-01',
        label: 'Render Callback 01',
      }
    ],
  },
];

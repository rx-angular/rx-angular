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
      },
      {
        link: 'render-callback/render-callback-02',
        label: 'Render Callback 02',
      },
      {
        link: 'render-callback/render-callback-03',
        label: 'Render Callback 03',
      },
      {
        link: 'render-callback/render-callback-04',
        label: 'Render Callback 04',
      },
      {
        link: 'render-callback/render-callback-05',
        label: 'Render Callback 05',
      }
    ],
  },
];

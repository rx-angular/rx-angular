import { MenuItem } from '../core/navigation/menu-item.interface';

export const MENU_ITEMS: MenuItem[] = [
  {
    link: 'push',
    label: 'Push Pipe Overview',
    children: [
      // 01. One single-shot observable bound by one push as template expression
      {
        link: 'push-01',
        label: 'Push Pipe 01',
      },
      // 02. One single-shot observable bound by multiple push as template expression
      {
        link: 'push-02',
        label: 'Push Pipe 02',
      },
      // 03. Multiple single-shot observables bound by multiple push as template expression
      {
        link: 'push-03',
        label: 'Push Pipe 03',
      },
      // 04. one sync multi-shot observables bound by multiple push as template expression
      {
        link: 'push-04',
        label: 'Push Pipe 04',
      },
      {
        link: 'push-05',
        label: 'Multi-Shot input binding',
      },
      // 11. One single-shot observable bound by one push as input binding
      {
        link: 'push-11',
        label: 'Push Pipe 11',
      },
      // 12. One single-shot observable passed directly to input binding rendered over push
      {
        link: 'push-12',
        label: 'Push Pipe 12',
      },
      // 13. One single-shot observable bound by multiple push as input binding
      {
        link: 'push-13',
        label: 'Push Pipe 13',
      },
      // 14. Multiple single-shot observables bound by multiple push as input binding
      {
        link: 'push-14',
        label: 'Push Pipe 14',
      },
      // 21. ???????????????
      {
        link: 'push-21',
        label: 'Push Pipe 21',
      },
      // 31. Injection Point
      {
        link: 'push-31',
        label: 'Push Pipe 31',
      },
    ],
  },
];

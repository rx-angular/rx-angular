import { MenuItem } from '../core/navigation/menu-item.interface';

export const MENU_ITEMS: MenuItem[] = [
  {
    link: 'cd',
    label: 'ChangeDetection Methods',
    children: [
      // 01.
      {
        link: 'detect-changes',
        label: 'ɵdetectChanges',
      },
      {
        link: 'ref-detect-changes',
        label: 'cdRef.detectChanges',
      },
      {
        link: 'ref-mark-for-check',
        label: 'cdRef.markForCheck',
      },
      {
        link: 'mark-dirty',
        label: 'ɵmarkDirty',
      },
      {
        link: 'app-ref-tick',
        label: 'ApplicationRef.tick',
      },
      {
        link: 'patched-apis',
        label: 'Patched Apis',
      }
    ],
  },
];

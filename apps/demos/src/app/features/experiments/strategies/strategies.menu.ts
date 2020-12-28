import { MENU_ITEMS as PARTIAL_TREE_UPDATES } from './partial-tree-update/partial-tree-update.menu';

export const MENU_ITEMS = [
  {
    link: 'inherit',
    label: 'Inherit',
  },
  {
    link: 'provide',
    label: 'Provide',
  },
  ...PARTIAL_TREE_UPDATES
];

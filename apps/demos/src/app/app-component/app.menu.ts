import { SHOWCASES_MENU_ITEMS } from '../features/showcases/showcases-shell.menu';
import { TEMPLATE_MENU } from '../features/template/template-shell.menu';
import { EXPERIMENTS_MENU as EXPERIMENTS_MENU_ITEMS } from '../features/experiments/experiments-shell.menu';
import { TUTORIALS_MENU } from '../features/tutorials/tutorials-shell.menu';

export const MENU_ITEMS = [
  {
    label: 'Template',
    link: 'template',
    children: TEMPLATE_MENU
  },
  {
    label: 'Tutorials',
    link: 'tutorials',
    children: TUTORIALS_MENU
  },
  {
    label: 'Showcases',
    link: 'showcases',
    children: SHOWCASES_MENU_ITEMS
  },
  {
    label: 'Experiments',
    link: 'experiments',
    children: EXPERIMENTS_MENU_ITEMS
  }
];

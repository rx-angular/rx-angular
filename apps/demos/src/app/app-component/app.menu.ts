import { FUNDAMENTALS_MENU } from '../features/fundamentals/fundamentals.menu';
import { TEMPLATE_MENU } from '../features/template/template-shell.menu';
import { TUTORIALS_MENU } from '../features/tutorials/tutorials-shell.menu';
import { INTEGRATIONS_MENU_ITEMS } from '../features/integrations/integrations-shell.menu';
import { EXPERIMENTS_MENU as EXPERIMENTS_MENU_ITEMS } from '../features/experiments/experiments-shell.menu';

export const MENU_ITEMS = [
  {
    label: '🏁 Fundamentals',
    link: 'fundamentals',
    children: FUNDAMENTALS_MENU
  },
  {
    label: '🧰 Template',
    link: 'template',
    children: TEMPLATE_MENU
  },
  {
    label: '📋 Tutorials',
    link: 'tutorials',
    children: TUTORIALS_MENU
  },
  {
    label: '🧮 Integrations',
    link: 'integrations',
    children: INTEGRATIONS_MENU_ITEMS
  },
  {
    label: '🔬 Experiments',
    link: 'experiments',
    children: EXPERIMENTS_MENU_ITEMS
  }
];

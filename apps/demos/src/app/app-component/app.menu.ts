import { FUNDAMENTALS_MENU } from '../features/concepts/fundamentals.menu';
import { INTEGRATIONS_MENU_ITEMS } from '../features/integrations/integrations-shell.menu';
import { STATE_MENU } from '../features/state/state-shell.menu';
import { TEMPLATE_MENU } from '../features/template/template-shell.menu';
import { TUTORIALS_MENU } from '../features/tutorials/tutorials-shell.menu';
// import { MENU_ITEMS as PERFORMANCE_MENU_ITEMS } from '../features/performance/performance-shell.menu';

export const MENU_ITEMS = [
  {
    label: '🧰 Template',
    link: 'template',
    children: TEMPLATE_MENU,
  },
  {
    label: 'State',
    link: 'state',
    children: STATE_MENU,
  },
  {
    label: '🏁 Concepts',
    link: 'concepts',
    children: FUNDAMENTALS_MENU,
  },
  {
    label: '📋 Tutorials',
    link: 'tutorials',
    children: TUTORIALS_MENU,
  },
  {
    label: '🧮 Integrations',
    link: 'integrations',
    children: INTEGRATIONS_MENU_ITEMS,
  },
  /* {
     label: '🔬 Experiments',
     link: 'experiments',
     children: EXPERIMENTS_MENU_ITEMS
   },
   {
     label: '🏎️ Performance',
     link: 'performance',
     children: PERFORMANCE_MENU_ITEMS
   }*/
];

import { CDK_MENU } from '../features/cdk/cdk.menu';
import { FUNDAMENTALS_MENU } from '../features/concepts/fundamentals.menu';
import { INTEGRATIONS_MENU_ITEMS } from '../features/integrations/integrations-shell.menu';
import { STATE_MENU } from '../features/state/state-shell.menu';
import { TEMPLATE_MENU } from '../features/template/template-shell.menu';
import { TUTORIALS_MENU } from '../features/tutorials/tutorials-shell.menu';
// import { MENU_ITEMS as PERFORMANCE_MENU_ITEMS } from '../features/performance/performance-shell.menu';

export const MENU_ITEMS = [
  {
    label: 'Template',
    link: 'template',
    icon: { matIcon: 'dashboard' },
    children: TEMPLATE_MENU,
  },
  {
    label: 'State',
    link: 'state',
    icon: { matIcon: 'hub' },
    children: STATE_MENU,
  },
  {
    label: 'CDK',
    link: 'cdk',
    icon: { matIcon: 'build' },
    children: CDK_MENU,
  },
  {
    label: 'Concepts',
    link: 'concepts',
    icon: { matIcon: 'school' },
    children: FUNDAMENTALS_MENU,
  },
  {
    label: 'Tutorials',
    link: 'tutorials',
    icon: { matIcon: 'menu_book' },
    children: TUTORIALS_MENU,
  },
  {
    label: 'Integrations',
    link: 'integrations',
    icon: { matIcon: 'extension' },
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

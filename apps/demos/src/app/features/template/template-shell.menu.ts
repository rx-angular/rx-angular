import { RX_CHUNK_MENU_ITEMS } from './chunk/rx-chunk.menu';
import { PUSH_PIPE_MENU } from './push/push.menu';
import { MENU_ITEMS as RX_LET_MENU_ITEMS } from './rx-let/rx-let.menu';
import { MENU_ITEMS as RX_IF_MENU_ITEMS } from './rx-if/rx-if.menu';
import { MENU_ITEMS as RX_CONTEXT_MENU_ITEMS } from './rx-context/rx-context.menu';
import { MENU_ITEMS as RX_FOR_MENU_ITEMS } from './rx-for/rx-for.menu';
import { MENU_ITEMS as VIEWPORT_PRIO_MENU_ITEMS } from './viewport-prio/viewport-prio.menu';
import { MENU_ITEMS as STRATEGY_MENU_ITEMS } from './strategies/concurrent-strategies.menu';
import { MENU_ITEMS as PIPES_MENU_ITEMS } from './pipes/pipes.menu';

export const TEMPLATE_MENU = [
  {
    label: 'Pipes',
    link: 'pipes',
    children: PIPES_MENU_ITEMS,
  },
  {
    label: 'rxContext',
    link: 'rx-context',
    children: RX_CONTEXT_MENU_ITEMS,
  },
  {
    label: 'push',
    link: 'push',
    children: PUSH_PIPE_MENU,
  },
  {
    label: '*rxLet',
    link: 'rx-let',
    children: RX_LET_MENU_ITEMS,
  },
  {
    label: '*rxIf',
    link: 'rx-if',
    children: RX_IF_MENU_ITEMS,
  },
  {
    label: '*rxFor',
    link: 'rx-for',
    children: RX_FOR_MENU_ITEMS,
  },
  {
    label: '*rxChunk',
    link: 'rx-chunk',
    children: RX_CHUNK_MENU_ITEMS,
  },
  {
    link: 'render-callback',
    label: 'Render Callback',
  },
  {
    label: 'Unpatch',
    link: 'unpatch',
  },
  {
    label: 'Strategies',
    link: 'strategies',
    children: STRATEGY_MENU_ITEMS,
  },
  {
    label: 'ViewPort Prio',
    link: 'view-port-prio',
    children: VIEWPORT_PRIO_MENU_ITEMS,
  },
];

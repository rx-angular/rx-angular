import { ZoneFlagsComponent } from './zone-flags/zone-flags.component';
import { DragNDropComponent } from './drag-n-drop/drag-n-drop.component';

export const ROUTES = [
  {
    path: '',
    component: DragNDropComponent
  },
  {
    path: 'dnd',
    component: DragNDropComponent
  },
  {
    path: 'maps',
    component: ZoneFlagsComponent
  }
];

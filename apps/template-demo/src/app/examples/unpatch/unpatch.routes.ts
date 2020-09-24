import { Routes } from '@angular/router';
import { ComparisonUnpatchComponent } from './comparison/comparison-unpatch.component';
import { UnpatchRoutingComponent } from './routing/unpatch-routing.component';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'comparison',
    pathMatch: 'full'
  },
  {
    path: 'comparison',
    component: ComparisonUnpatchComponent
  },

  {
    path: 'routing',
    component: UnpatchRoutingComponent
  }
];

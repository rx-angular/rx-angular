import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'signal-state',
    pathMatch: 'full',
  },
  {
    path: 'signal-state',
    loadComponent: () =>
      import('./signal-state/signal-state.component').then(
        (mod) => mod.SignalStateComponent,
      ),
  },
  {
    path: 'rx-actions',
    loadChildren: () =>
      import('./rx-actions/rx-actions.routes').then((m) => m.RX_ACTIONS_ROUTES),
  },
  {
    path: 'rx-effects',
    loadChildren: () =>
      import('./rx-effects/rx-effects.routes').then((m) => m.RX_EFFECTS_ROUTES),
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(ROUTES)],
})
export class StateShellModule {}

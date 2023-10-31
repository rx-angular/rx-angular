import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  {
    path: 'signal-state',
    loadComponent: () =>
      import('./signal-state/signal-state.component').then(
        (mod) => mod.SignalStateComponent
      ),
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(ROUTES)],
})
export class StateShellModule {}

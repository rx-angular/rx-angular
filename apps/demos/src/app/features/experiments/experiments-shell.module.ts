import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  {
    path: 'rx-base-state',
    loadChildren: () =>
      import('./state/rx-state.module').then((mod) => mod.RxStateModule),
    canActivate: [],
    canActivateChild: [],
  },
  {
    path: 'strategies',
    loadChildren: () =>
      import('./strategies/strategies.module').then((m) => m.StrategiesModule),
  },
  {
    path: 'embedded-view',
    loadChildren: () =>
      import('./cd-embedded-view/cd-embedded-view.module').then(
        (m) => m.CdEmbeddedViewModule
      ),
  },
  {
    path: 'rx-let-vs-push',
    loadChildren: () =>
      import('./rx-let-vs-push/rx-let-vs-push.module').then(
        (m) => m.RxLetVsPushModule
      ),
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(ROUTES)],
})
export class ExperimentsShellModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  {
    path: 'differ',
    loadChildren: () =>
      import('./differ/differ.module').then(
        (m) => m.DifferModule
      )
  },
  {
    path: 'strategies',
    loadChildren: () =>
      import('./strategies/strategies.module').then(
        (m) => m.StrategiesModule
      )
  },
  {
  path: 'pipes',
    loadChildren: () =>
      import('./pipes/pipes.module').then(
        (m) => m.PipesModule
      )
  },
  {
    path: 'rx-base-state',
    loadChildren: () =>
      import('./state/rx-state.module').then((mod) => mod.RxStateModule),
    canActivate: [],
    canActivateChild: []
  },
  {
    path: 'structural-directives',
    loadChildren: () =>
      import('./structural-directives/structural-directives.module').then(
        (m) => m.StructuralDirectivesModule
      )
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(ROUTES)]
})
export class ExperimentsShellModule {
}

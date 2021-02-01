import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  {
    path: 'strategies',
    loadChildren: () =>
      import('./strategies/strategies.module').then(
        (m) => m.StrategiesModule
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
  },
  {
    path: 'input-bindings',
    loadChildren: () =>
      import('./input-bindings/input-bindings.module').then(
        (m) => m.InputBindingsModule
      )
  },
  {
    path: 'decorators',
    loadChildren: () =>
      import('./decorators/decorators.module').then(
        (m) => m.DecoratorsModule
      )
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(ROUTES)]
})
export class ExperimentsShellModule {
}

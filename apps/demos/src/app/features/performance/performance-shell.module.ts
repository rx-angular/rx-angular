import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  {
    path: 'rx-let-vs-push',
    loadChildren: () =>
      import('./rx-let-vs-push/rx-let-vs-push.module').then(
        (m) => m.RxLetVsPushModule
      ),
  },
  {
    path: 'alphas-compare',
    loadChildren: () =>
      import('./alphas-compare/alphas-compare.module').then(
        (m) => m.AlphasCompareModule
      ),
  },
  {
    path: 'nested-component-structure',
    loadChildren: () =>
      import('./nested-component-structure/nested-component-structure.module').then(
        (m) => m.NestedComponentStructureModule
      ),
  },
  {
    path: 'sibling-component-structure',
    loadChildren: () =>
      import('./sibling-component-structure/sibling-component-structure.module').then(
        (m) => m.SiblingComponentStructureModule
      ),
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(ROUTES)],
})
export class PerformanceShellModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

export const ROUTES = [
  {
    path: '',
    redirectTo: 'memo'
  },
  {
    path: 'memo',
    loadChildren: () =>
      import('./memo-poc/memo-poc.module').then(
        m => m.MemoPocModule
      )
  },
  {
    path: 'pipe',
    loadChildren: () =>
      import('./pipe-poc/pipe-poc.module').then(
        m => m.PipePocModule
      )
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
})
export class PipesModule {

}

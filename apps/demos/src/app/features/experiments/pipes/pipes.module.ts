import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

export const ROUTES = [
  {
    path: '',
    redirectTo: 'push'
  },
  {
    path: 'push',
    loadChildren: () =>
      import('./push-poc/push-poc.module').then(
        m => m.PushPocModule
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

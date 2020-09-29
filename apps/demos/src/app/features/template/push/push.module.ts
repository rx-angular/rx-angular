import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

export const ROUTES = [
  {
    path: '',
    redirectTo: 'basic-example'
  },
  {
    path: 'basic-example',
    loadChildren: () =>
      import('./push-basic-example/push-basic-example.module').then(
        m => m.PushBasicExampleModule
      )
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
})
export class PushDemoModule {}

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
      import('./push-basic/push-basic.module').then(
        m => m.PushBasicModule
      )
  },
  {
    path: 'vs-async',
    loadChildren: () =>
      import('./push-vs-async/push-vs-async.module').then(
        m => m.PushVsAsyncModule
      )
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
})
export class PushDemoModule {}

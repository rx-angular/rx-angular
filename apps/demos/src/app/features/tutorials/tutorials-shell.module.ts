import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

const TUTORIAL_ROUTES = [
  {
    path: '',
    redirectTo: 'basics',
    pathMatch: 'full'
  },
  {
    path: 'basics',
    loadChildren: () =>
      import('./basics/tutorial-basics.module').then(
        m => m.TutorialBasicsModule
      )
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(TUTORIAL_ROUTES)
  ]
})
export class TutorialsShellModule {}

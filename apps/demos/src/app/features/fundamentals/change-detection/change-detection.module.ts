import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES as CD_ROUTES } from './change-detection.routes';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(CD_ROUTES)
  ]
})
export class ChangeDetectionModule {
}

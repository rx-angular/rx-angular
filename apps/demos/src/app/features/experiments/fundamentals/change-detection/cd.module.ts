import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES as CD_ROUTES } from './cd.routes';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(CD_ROUTES)
  ]
})
export class CdModule {
}

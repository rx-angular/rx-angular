import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './starter.routes';
import { StarterComponent } from './starter.component';
import { SharedModule } from '../shared/shared.module';

const DECLARATIONS = [StarterComponent];

@NgModule({
  declarations: DECLARATIONS,
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class StarterModule {
}

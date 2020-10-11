import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './starter.routes';
import { CounterComponent } from './counter.component';
import { SharedModule } from '../shared/shared.module';

const DECLARATIONS = [CounterComponent];

@NgModule({
  declarations: DECLARATIONS,
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class StarterModule {
}

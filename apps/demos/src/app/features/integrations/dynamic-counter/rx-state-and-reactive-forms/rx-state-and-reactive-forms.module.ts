import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './rx-state-and-reactive-forms.routes';
import { RxStateAndReactiveFormsCounterComponent } from './rx-state-and-reactive-forms.component';
import { SharedModule } from '../shared/shared.module';

const DECLARATIONS = [RxStateAndReactiveFormsCounterComponent];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(ROUTES), ...DECLARATIONS],
})
export class RxStateAndReactiveFormsModule {}

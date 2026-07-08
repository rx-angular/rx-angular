import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { RxStateAndReactiveFormsCounterComponent } from './rx-state-and-reactive-forms.component';
import { ROUTES } from './rx-state-and-reactive-forms.routes';

const DECLARATIONS = [RxStateAndReactiveFormsCounterComponent];

@NgModule({
  declarations: DECLARATIONS,
  imports: [SharedModule, RouterModule.forChild(ROUTES)],
})
export class RxStateAndReactiveFormsModule {}

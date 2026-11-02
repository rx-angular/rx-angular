import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { RxStateAsPresenterComponent } from './rx-state-as-presenter.component';
import { ROUTES } from './rx-state-as-presenter.routes';

const DECLARATIONS = [RxStateAsPresenterComponent];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(ROUTES), ...DECLARATIONS],
})
export class RxStateAsPresenterModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './rx-state-as-presenter.routes';
import { RxStateAsPresenterComponent } from './rx-state-as-presenter.component';
import { SharedModule } from '../shared/shared.module';

const DECLARATIONS = [RxStateAsPresenterComponent];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(ROUTES), ...DECLARATIONS],
})
export class RxStateAsPresenterModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './rx-state-and-subjects.routes';
import { RxStateAndSubjectsComponent } from './rx-state-and-subjects.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';

const DECLARATIONS = [RxStateAndSubjectsComponent];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES),
    CommonModule,
    ...DECLARATIONS,
  ],
})
export class RxStateAndSubjectsModule {}

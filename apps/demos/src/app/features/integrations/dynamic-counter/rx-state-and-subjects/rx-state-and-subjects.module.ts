import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { RxStateAndSubjectsComponent } from './rx-state-and-subjects.component';
import { ROUTES } from './rx-state-and-subjects.routes';

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

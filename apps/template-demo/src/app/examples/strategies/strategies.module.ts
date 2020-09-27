import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES } from './strategies.routes';
import { DirtyChecksModule } from '../../debug-helper/dirty-checks/dirty-checks.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class StrategiesDemoModule {
}

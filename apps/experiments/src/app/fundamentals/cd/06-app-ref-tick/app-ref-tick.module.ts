import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES as CD_ROUTES } from './app-ref-tick.routes';
import { MatButtonModule } from '@angular/material/button';
import { UnpatchEventsModule } from '@rx-angular/template';
import { AppRefTickComponent } from './app-ref-tick.component';
import { Child0601Component } from './child01.component';
import { Child060101Component } from './child0101.component';
import { Child0602Component } from './child02.component';
import { DirtyChecksModule } from '../../../shared/debug-helper/dirty-checks/dirty-checks.module';


@NgModule({
  declarations: [
    AppRefTickComponent,
    Child0601Component,
    Child0602Component,
    Child060101Component
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CD_ROUTES),
    MatButtonModule,
    DirtyChecksModule,
    UnpatchEventsModule
  ]
})
export class AppRefTickModule {
}

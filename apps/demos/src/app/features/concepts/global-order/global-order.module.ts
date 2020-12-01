import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { LetModule } from '../../../shared/rx-angular-pocs/let/let.module';
import { RxForPocModule } from '../../experiments/structural-directives/rx-for-poc/rx-for-poc.module';
import { RxLetPocModule } from '../../experiments/structural-directives/rx-let-poc/rx-let-poc.module';
import { ROUTES } from './global-order.routes';
import { PushModule, UnpatchEventsModule } from '@rx-angular/template';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer';
import { BComponent } from './a/b/b.component';
import { CComponent } from './a/c/c.component';
import { AComponent } from './a/a.component';
import { GlobalOrderComponent } from './global-order.component';
import { ChildrenComponent } from './a/children/children.component';

@NgModule({
  declarations: [
    GlobalOrderComponent,
    AComponent,
    BComponent,
    CComponent,
    ChildrenComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    VisualizerModule,
    PushModule,
    RxForPocModule,
    UnpatchEventsModule,
    RxLetPocModule,
    MatButtonModule,
    LetModule
  ],
  exports: []
})
export class GlobalOrderModule {
}

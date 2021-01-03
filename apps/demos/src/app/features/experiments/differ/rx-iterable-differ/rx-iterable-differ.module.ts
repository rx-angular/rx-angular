import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PushModule } from '@rx-angular/template';
import { RxLetModule } from '../../../../rx-angular-pocs/template/directives/let/let.module';

import { SharedModule } from '../shared/shared.module';
import { ROUTES } from './rx-iterable-differ.routes';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { MatButtonModule } from '@angular/material/button';
import { RxIterableDifferComponent } from './rx-iterable-differ/rx-iterable-differ.component';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer/visualizer.module';
import { ValueProvidersModule } from '../../../../shared/debug-helper/value-provider';
import { RxForModule } from '../../../../rx-angular-pocs/template/directives/for';

const DECLARATIONS = [RxIterableDifferComponent];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    PushModule,
    RxLetModule,
    DirtyChecksModule,
    MatButtonModule,
    VisualizerModule,
    ValueProvidersModule, SharedModule,
    RxForModule
  ]
})
export class RxIterableDifferModule {
}

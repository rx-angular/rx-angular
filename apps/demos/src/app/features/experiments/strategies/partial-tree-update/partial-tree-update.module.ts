import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES as CD_ROUTES } from './partial-tree-update.routes';
import { PartialTreeUpdateContainerComponent } from './partial-tree-update.container.component';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NativeVModule } from './native-v/native-v.module';
import { RxLetVModule } from './rx-let-v/rx-let-v.module';
import { MatButtonModule } from '@angular/material/button';
import { UnpatchEventsModule } from '../../../../rx-angular-pocs/directives/unpatch';
import { RxLetModule } from '../../../../rx-angular-pocs/directives/let';
import { PushModule } from '../../../../rx-angular-pocs/pipes/push';
import { PushCustomStratVModule } from './push-custom-strat-v/push-custom-strat-v.module';

const DECLARATIONS = [
  PartialTreeUpdateContainerComponent
];

@NgModule({
  declarations: [DECLARATIONS],
  exports: [],
  imports: [
    CommonModule,
    RouterModule.forChild(CD_ROUTES),
    VisualizerModule,
    MatButtonToggleModule,
    NativeVModule,
    RxLetVModule,
    PushCustomStratVModule,
    MatButtonModule,
    UnpatchEventsModule,
    RxLetModule,
    PushModule
  ]
})
export class PartialTreeUpdateModule {
}

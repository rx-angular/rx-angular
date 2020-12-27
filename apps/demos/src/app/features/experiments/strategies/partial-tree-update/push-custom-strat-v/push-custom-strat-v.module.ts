import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxLetModule } from '../../../../../rx-angular-pocs/directives/let';
import { VisualizerModule } from '../../../../../shared/debug-helper/visualizer';
import { V3AComponent } from './v3-a.component';
import { V3BComponent } from './v3-b.component';
import { V3CComponent } from './v3-c.component';
import { V3DComponent } from './v3-d.component';
import { V3EComponent } from './v3-e.component';
import { V3FComponent } from './v3-f.component';
import { V3HComponent } from './v3-h.component';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { UnpatchEventsModule } from '../../../../../rx-angular-pocs/directives/unpatch';
import { PushModule } from '../../../../../rx-angular-pocs/pipes/push';
import { ENVIRONMENT_SETTINGS } from '../../../../../shared/environment.token';
import { environment } from '../../../../../../environments/environment';
import {
  getCustomStrategyCredentialsMap,
  RX_CUSTOM_STRATEGIES, RX_PRIMARY_STRATEGY
} from '../../../../../rx-angular-pocs/render-strategies';
import { getPartialTreeCredentials } from './partial-tree.strategy';
import { MatIconModule } from '@angular/material/icon';




@NgModule({
  declarations: [
    V3AComponent,
    V3BComponent,
    V3CComponent,
    V3DComponent,
    V3EComponent,
    V3FComponent,
    V3HComponent,
  ],
  imports: [
    CommonModule,
    VisualizerModule,
    SharedModule,
    RxLetModule,
    MatButtonModule,
    UnpatchEventsModule,
    PushModule,
    MatIconModule
  ],
  exports: [V3AComponent]
})
export class PushCustomStratVModule { }

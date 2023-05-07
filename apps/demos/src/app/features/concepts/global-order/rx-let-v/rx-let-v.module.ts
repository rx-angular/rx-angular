import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxLetModule } from '../../../../rx-angular-pocs';
import { UnpatchEventsModule } from '../../../../rx-angular-pocs';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { V3AComponent } from './v3-a.component';
import { V3BComponent } from './v3-b.component';
import { V3CComponent } from './v3-c.component';
import { V3DComponent } from './v3-d.component';
import { V3EComponent } from './v3-e.component';
import { V3FComponent } from './v3-f.component';
import { V3HComponent } from './v3-h.component';
import { SharedModule } from '../shared/shared.module';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { PushModule } from '../../../../rx-angular-pocs';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';

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
    UnpatchEventsModule,
    RxLetModule,
    PushModule,
    DirtyChecksModule,
  ],
  exports: [V3AComponent],
})
export class RxLetVModule {}

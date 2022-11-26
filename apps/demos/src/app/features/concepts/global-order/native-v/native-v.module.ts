import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { SharedModule } from '../shared/shared.module';
import { V1AComponent } from './v1-a.component';
import { V1BComponent } from './v1-b.component';
import { V1DComponent } from './v1-d.component';
import { V1CComponent } from './v1-c.component';
import { V1EComponent } from './v1-e.component';
import { V1FComponent } from './v1-f.component';
import { V1HComponent } from './v1-h.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

@NgModule({
  declarations: [
    V1AComponent,
    V1BComponent,
    V1CComponent,
    V1DComponent,
    V1EComponent,
    V1FComponent,
    V1HComponent,
  ],
  imports: [
    CommonModule,
    VisualizerModule,
    SharedModule,
    MatButtonModule,
    VisualizerModule,
  ],
  exports: [V1AComponent],
})
export class NativeVModule {}

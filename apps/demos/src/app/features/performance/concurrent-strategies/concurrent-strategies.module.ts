import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES } from './concurrent-strategies.routes';
import { MatButtonModule } from '@angular/material/button';
import { PushModule, UnpatchEventsModule } from '@rx-angular/template';
import { ConcurrentStrategiesComponent } from './concurrent-strategies.component';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer';
import { SiblingModule } from '../../../shared/template-structures/sibling/sibling.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    ConcurrentStrategiesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    MatButtonModule,
    UnpatchEventsModule,
    VisualizerModule,
    SiblingModule,
    MatCheckboxModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    PushModule
  ],
  exports: []
})
export class ConcurrentStrategiesModule {
}

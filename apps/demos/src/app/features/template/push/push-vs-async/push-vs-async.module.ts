import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { RxPush } from '@rx-angular/template/push';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { ValueProvidersModule } from '../../../../shared/debug-helper/value-provider/value-providers.module';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer/visualizer.module';
import { RecursiveModule } from '../../../../shared/template-structures/recursive/recursive.module';
import { PushVsAsyncComponent } from './push-vs-async.component';
import { ROUTES } from './push-vs-async.routes';

const DECLARATIONS = [PushVsAsyncComponent];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    RxPush,
    DirtyChecksModule,
    MatButtonModule,
    RxUnpatch,
    VisualizerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonToggleModule,
    RecursiveModule,
    ValueProvidersModule,
    MatIconModule,
  ],
  exports: [DECLARATIONS],
})
export class PushVsAsyncModule {}

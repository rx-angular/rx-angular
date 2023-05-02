import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { PushPipe } from '@rx-angular/template/push';
import { RxLet } from '@rx-angular/template/let';
import { UnpatchModule } from '@rx-angular/template/unpatch';
import { ComparisonComponent } from './comparison.component';

import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { FormsModule } from '@angular/forms';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { SiblingModule } from '../../../../shared/template-structures/sibling/sibling.module';
import { ImageArrayModule } from '../../../../shared/image-array/image-array.module';
import { ROUTES } from './comparison.routes';
import { RxForModule, PipeModule } from '../../../../rx-angular-pocs';
import { RxIf } from '@rx-angular/template/if';

@NgModule({
  declarations: [ComparisonComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    MatButtonModule,
    UnpatchModule,
    VisualizerModule,
    SiblingModule,
    MatCheckboxModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    PushPipe,
    ImageArrayModule,
    RxLet,
    RxForModule,
    RxIf,
    PipeModule,
  ],
  exports: [],
})
export class ComparisonModule {}

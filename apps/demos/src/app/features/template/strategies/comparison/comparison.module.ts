import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { RouterModule } from '@angular/router';
import { LetModule } from '@rx-angular/template/let';
import { PushModule } from '@rx-angular/template/push';
import { UnpatchModule } from '@rx-angular/template/unpatch';
import { ComparisonComponent } from './comparison.component';

import { FormsModule } from '@angular/forms';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { IfModule } from '@rx-angular/template/if';
import { PipeModule, RxForModule } from '../../../../rx-angular-pocs';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { ImageArrayModule } from '../../../../shared/image-array/image-array.module';
import { SiblingModule } from '../../../../shared/template-structures/sibling/sibling.module';
import { ROUTES } from './comparison.routes';

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
    PushModule,
    ImageArrayModule,
    LetModule,
    RxForModule,
    IfModule,
    PipeModule,
  ],
  exports: [],
})
export class ComparisonModule {}

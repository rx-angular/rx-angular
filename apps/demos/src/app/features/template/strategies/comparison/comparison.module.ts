import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { PushModule } from '@rx-angular/template/push';
import { LetModule } from '@rx-angular/template/let';
import { UnpatchModule } from '@rx-angular/template/unpatch';
import { ComparisonComponent } from './comparison.component';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { SiblingModule } from '../../../../shared/template-structures/sibling/sibling.module';
import { ImageArrayModule } from '../../../../shared/image-array/image-array.module';
import { ROUTES } from './comparison.routes';
import { RxForModule, PipeModule } from '../../../../rx-angular-pocs';
import { IfModule } from '@rx-angular/template/if';

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

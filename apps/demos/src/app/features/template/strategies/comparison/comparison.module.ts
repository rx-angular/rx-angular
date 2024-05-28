import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { RxPush } from '@rx-angular/template/push';
import { RxLet } from '@rx-angular/template/let';
import { RxUnpatch } from '@rx-angular/template/unpatch';
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
import { RxIf } from '@rx-angular/template/if';

@NgModule({
  declarations: [ComparisonComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    MatButtonModule,
    RxUnpatch,
    VisualizerModule,
    SiblingModule,
    MatCheckboxModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    RxPush,
    ImageArrayModule,
    RxLet,
    RxForModule,
    RxIf,
    PipeModule,
  ],
  exports: [],
})
export class ComparisonModule {}

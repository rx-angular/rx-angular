import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxFor } from '@rx-angular/template/for';
import { RxLet } from '@rx-angular/template/let';
import { RxPush } from '@rx-angular/template/push';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { MatButtonModule } from '@angular/material/button';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { ValueModule } from '../../../../shared/debug-helper/work';
import { RxForNestedListsComponent } from './nested-lists.component';
import { RxMinimalForOf } from './rx-for-minimal.directive';
import { RxForValueComponent } from './rx-for-value.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { StrategySelectModule } from '../../../../shared/debug-helper/strategy-select';
import { RxForNormal } from './rx-for-normal.directive';

const DECLARATIONS = [
  RxForNestedListsComponent,
  RxMinimalForOf,
  RxForNormal,
  RxForValueComponent,
];

@NgModule({
  declarations: DECLARATIONS,
  imports: [
    CommonModule,
    VisualizerModule,
    RxUnpatch,
    MatButtonModule,
    DirtyChecksModule,
    ValueModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RxLet,
    RxFor,
    StrategySelectModule,
    RxPush,
  ],
  exports: DECLARATIONS,
})
export class NestedListsModule {}

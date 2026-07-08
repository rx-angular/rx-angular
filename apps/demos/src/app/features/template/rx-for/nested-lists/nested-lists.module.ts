import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RxFor } from '@rx-angular/template/for';
import { RxLet } from '@rx-angular/template/let';
import { RxPush } from '@rx-angular/template/push';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { StrategySelectModule } from '../../../../shared/debug-helper/strategy-select';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { ValueModule } from '../../../../shared/debug-helper/work';
import { RxForNestedListsComponent } from './nested-lists.component';
import { RxMinimalForOf } from './rx-for-minimal.directive';
import { RxForNormal } from './rx-for-normal.directive';
import { RxForValueComponent } from './rx-for-value.component';

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

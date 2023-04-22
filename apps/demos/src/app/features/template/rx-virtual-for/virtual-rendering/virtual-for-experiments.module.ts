import { ScrollingModule as AutosizedScrollingModule } from '@angular/cdk-experimental/scrolling';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import {
  AutoSizeVirtualScrollStrategy,
  DynamicSizeVirtualScrollStrategy,
  FixedSizeVirtualScrollStrategy,
  RxVirtualScrollViewportComponent,
  RxVirtualFor,
} from '@rx-angular/template/experimental/virtual-scrolling';
import { RxFor } from '@rx-angular/template/for';
import { RxIf } from '@rx-angular/template/if';
import { LetDirective } from '@rx-angular/template/let';
import { StrategySelectModule } from '../../../../shared/debug-helper/strategy-select/index';
import { ValueProvidersModule } from '../../../../shared/debug-helper/value-provider/index';
import { VirtualForTestComponent } from './virtual-for-test.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: VirtualForTestComponent,
      },
    ]),
    ValueProvidersModule,
    LetDirective,
    AutosizedScrollingModule,
    ScrollingModule,
    AutoSizeVirtualScrollStrategy,
    MatButtonModule,
    MatInputModule,
    FixedSizeVirtualScrollStrategy,
    DynamicSizeVirtualScrollStrategy,
    RxVirtualFor,
    StrategySelectModule,
    MatButtonToggleModule,
    CommonModule,
    RxIf,
    RxVirtualScrollViewportComponent,
    RxFor,
  ],
  declarations: [VirtualForTestComponent],
  providers: [],
})
export class RxVirtualForModule {}

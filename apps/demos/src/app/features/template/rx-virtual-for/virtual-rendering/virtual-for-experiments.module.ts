import { ScrollingModule as AutosizedScrollingModule } from '@angular/cdk-experimental/scrolling';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { IfModule } from '@rx-angular/template/experimental/if';
import { LetModule } from '@rx-angular/template/let';
import { StrategySelectModule } from '../../../../shared/debug-helper/strategy-select/index';
import { ValueProvidersModule } from '../../../../shared/debug-helper/value-provider/index';
import {
  AutosizeVirtualScrollStrategyModule,
  FixedSizeVirtualScrollStrategyModule,
  RxVirtualScrollingModule,
} from '@rx-angular/template/experimental/virtual-scrolling';
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
    LetModule,
    AutosizedScrollingModule,
    ScrollingModule,
    AutosizeVirtualScrollStrategyModule,
    MatButtonModule,
    MatInputModule,
    FixedSizeVirtualScrollStrategyModule,
    StrategySelectModule,
    MatButtonToggleModule,
    CommonModule,
    IfModule,
    RxVirtualScrollingModule,
    FixedSizeVirtualScrollStrategyModule,
    AutosizeVirtualScrollStrategyModule,
  ],
  declarations: [VirtualForTestComponent],
  providers: [],
})
export class RxVirtualForModule {}

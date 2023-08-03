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
  RxVirtualScrollWindowDirective,
  RxVirtualScrollElementDirective,
} from '@rx-angular/template/experimental/virtual-scrolling';
import { RxFor } from '@rx-angular/template/for';
import { RxIf } from '@rx-angular/template/if';
import { RxLet } from '@rx-angular/template/let';
import { StrategySelectModule } from '../../../../shared/debug-helper/strategy-select/index';
import { ValueProvidersModule } from '../../../../shared/debug-helper/value-provider/index';
import { VirtualForDemoComponent } from './virtual-for-demo.component';
import { VirtualForScrollWindowDemoComponent } from './virtual-for-scroll-window-demo.component';
import { VirtualForCustomScrollableDemoComponent } from './virtual-for-scrollable-demo.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: VirtualForDemoComponent,
      },
      {
        path: 'custom-scroll',
        component: VirtualForCustomScrollableDemoComponent,
      },
      {
        path: 'window-scrolling',
        component: VirtualForScrollWindowDemoComponent,
      },
    ]),
    ValueProvidersModule,
    RxLet,
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
    RxVirtualScrollWindowDirective,
    RxVirtualScrollElementDirective,
  ],
  declarations: [
    VirtualForDemoComponent,
    VirtualForCustomScrollableDemoComponent,
    VirtualForScrollWindowDemoComponent,
  ],
  providers: [],
})
export class RxVirtualForModule {}

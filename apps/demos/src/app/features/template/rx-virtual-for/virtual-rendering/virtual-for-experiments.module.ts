import { ScrollingModule as AutosizedScrollingModule } from '@angular/cdk-experimental/scrolling';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { VirtualForCrazyUpdateComponent } from './virtual-for-crazy-update.component';
import { VirtualForDemoComponent } from './virtual-for-demo.component';
import { VirtualForMonkeyTestComponent } from './virtual-for-monkey-test.component';
import { VirtualForReverseInfiniteScrollComponent } from './virtual-for-reverse-infinite-scroll.component';
import { VirtualForScrollWindowDemoComponent } from './virtual-for-scroll-window-demo.component';
import { VirtualForCustomScrollableDemoComponent } from './virtual-for-scrollable-demo.component';
import { VirtualForScrollToDemoComponent } from './virtual-for-scrollto-demo.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'showcase',
        pathMatch: 'full',
      },
      {
        path: 'showcase',
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
      {
        path: 'reverse-infinite-scroll',
        component: VirtualForReverseInfiniteScrollComponent,
      },
      {
        path: 'monkey-test',
        component: VirtualForMonkeyTestComponent,
      },
      {
        path: 'crazy-update',
        component: VirtualForCrazyUpdateComponent,
      },
      {
        path: 'scroll-to',
        component: VirtualForScrollToDemoComponent,
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
    FormsModule,
  ],
  declarations: [
    VirtualForDemoComponent,
    VirtualForCustomScrollableDemoComponent,
    VirtualForScrollWindowDemoComponent,
    VirtualForMonkeyTestComponent,
  ],
  providers: [],
})
export class RxVirtualForModule {}

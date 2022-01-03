import { ScrollingModule as AutosizedScrollingModule } from '@angular/cdk-experimental/scrolling';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { LetModule } from '@rx-angular/template/let';
import { ValueProvidersModule } from '../../../../shared/debug-helper/value-provider/index';
import { AutosizeVirtualScrollStrategyModule } from './scroll-strategies/autosized-virtual-scroll-strategy';
import { FixedSizeVirtualScrollStrategyModule } from './scroll-strategies/fixed-size-virtual-scroll-strategy';
import { VirtualForTestComponent } from './virtual-for-test.component';
import { RxVirtualScrollViewportComponent } from './virtual-scroll-viewport.component';
import { RxVirtualFor } from './virtual-for.directive';

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
  ],
  exports: [RxVirtualScrollViewportComponent],
  declarations: [
    RxVirtualFor,
    RxVirtualScrollViewportComponent,
    VirtualForTestComponent,
  ],
  providers: [],
})
export class RxVirtualForModule {}

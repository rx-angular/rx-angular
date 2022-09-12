import { NgModule } from '@angular/core';
import { RxVirtualFor } from './virtual-for.directive';

import { RxVirtualScrollViewportComponent } from './virtual-scroll-viewport.component';

@NgModule({
  imports: [],
  exports: [RxVirtualScrollViewportComponent, RxVirtualFor],
  declarations: [RxVirtualScrollViewportComponent, RxVirtualFor],
  providers: [],
})
export class RxVirtualScrollingModule {}

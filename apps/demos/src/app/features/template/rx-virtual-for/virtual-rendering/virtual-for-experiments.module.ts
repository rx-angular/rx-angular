import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LetModule } from '@rx-angular/template/let';
import { ValueProvidersModule } from '../../../../shared/debug-helper/value-provider/index';
import { VirtualForTestComponent } from './virtual-for-test.component';
import { RxVirtualForViewportComponent } from './virtual-for-viewport.component';
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
  ],
  exports: [RxVirtualForViewportComponent],
  declarations: [
    RxVirtualFor,
    RxVirtualForViewportComponent,
    VirtualForTestComponent,
  ],
  providers: [],
})
export class RxVirtualForModule {}

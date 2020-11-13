import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { UnpatchEventsModule } from '@rx-angular/template';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { PushModule } from '../../../../shared/rx-angular-pocs/push/push.module';
import { MemoPocComponent } from './memo-poc.component';
import { ROUTES } from './memo-poc.routes';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FibonacciPipe } from './fibonacci.pipe';
import { MemoModule } from '../../../../shared/rx-angular-pocs/memo/memo.module';
import { FibonacciMemoPipe } from './fibonacciMemo.pipe';

const DECLARATIONS = [MemoPocComponent, FibonacciPipe, FibonacciMemoPipe];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    PushModule,
    DirtyChecksModule,
    MatButtonModule,
    UnpatchEventsModule,
    MatButtonToggleModule,
    MemoModule
  ],
  exports: [DECLARATIONS]
})
export class MemoPocModule {
}

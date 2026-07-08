import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RouterModule } from '@angular/router';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { MemoModule, PushModule } from '../../../../rx-angular-pocs';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { FibonacciPipe } from './fibonacci.pipe';
import { FibonacciMemoPipe } from './fibonacciMemo.pipe';
import { MemoPocComponent } from './memo-poc.component';
import { ROUTES } from './memo-poc.routes';

const DECLARATIONS = [MemoPocComponent, FibonacciPipe, FibonacciMemoPipe];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    PushModule,
    DirtyChecksModule,
    MatButtonModule,
    RxUnpatch,
    MatButtonToggleModule,
    MemoModule,
  ],
  exports: [DECLARATIONS],
})
export class MemoPocModule {}

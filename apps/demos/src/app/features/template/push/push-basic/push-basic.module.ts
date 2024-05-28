import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { RxPush } from '@rx-angular/template/push';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks/index';
import { PushBasicComponent } from './push-basic.component';
import { ROUTES } from './push-basic.routes';

const DECLARATIONS = [PushBasicComponent];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    RxPush,
    DirtyChecksModule,
    MatButtonModule,
    RxUnpatch,
  ],
  exports: [DECLARATIONS],
})
export class PushBasicModule {}

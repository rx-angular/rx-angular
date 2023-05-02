import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { RouterModule } from '@angular/router';
import { PushPipe } from '@rx-angular/template/push';
import { UnpatchModule } from '@rx-angular/template/unpatch';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks/index';
import { PushBasicComponent } from './push-basic.component';
import { ROUTES } from './push-basic.routes';

const DECLARATIONS = [PushBasicComponent];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    PushPipe,
    DirtyChecksModule,
    MatButtonModule,
    UnpatchModule,
  ],
  exports: [DECLARATIONS],
})
export class PushBasicModule {}

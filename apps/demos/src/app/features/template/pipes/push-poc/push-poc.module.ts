import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { PushModule } from '@rx-angular/template';
import { UnpatchModule } from '@rx-angular/template/unpatch';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { PushPocComponent } from './push-poc.component';
import { ROUTES } from './push-poc.routes';

const DECLARATIONS = [PushPocComponent];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    PushModule,
    DirtyChecksModule,
    MatButtonModule,
    UnpatchModule
  ],
  exports: [DECLARATIONS]
})
export class PushPocModule {
}

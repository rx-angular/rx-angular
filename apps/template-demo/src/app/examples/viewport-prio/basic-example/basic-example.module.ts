import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES } from './basic-example.routes';
import { BasicExampleComponent } from './basic-example.component';
import { UnpatchEventsModule, ViewportPrioModule } from '@rx-angular/template';
import { DirtyChecksModule } from '../../../debug-helper/dirty-checks/dirty-checks.module';
import { MatButtonModule } from '@angular/material/button';

const DECLARATIONS = [BasicExampleComponent];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    ViewportPrioModule,
    UnpatchEventsModule,
    DirtyChecksModule,
    RouterModule.forChild(ROUTES),
    MatButtonModule
  ],
  exports: [DECLARATIONS]
})
export class BasicExampleModule {
}

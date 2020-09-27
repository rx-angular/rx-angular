import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PushModule, TemplateModule } from '@rx-angular/template';
import { ROUTES } from './push-basic-example.routes';
import { DirtyChecksModule } from '../../../debug-helper/dirty-checks/dirty-checks.module';
import { PushBasicExampleComponent } from './push-basic-example.component';

const DECLARATIONS = [PushBasicExampleComponent];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    PushModule,
    DirtyChecksModule
  ],
  exports: [DECLARATIONS]
})
export class PushBasicExampleModule {}

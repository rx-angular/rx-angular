import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadTestComponent } from './loadtest/load-test.component';
import { TemplateModule } from '@rx-angular/template';

const DECLARATIONS = [LoadTestComponent];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [CommonModule, TemplateModule],
  exports: [DECLARATIONS]
})
export class SharedModule {}

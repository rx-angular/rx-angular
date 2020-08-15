import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadTestComponent } from './loadtest/load-test.component';
import { TemplateModule, UnpatchEventsModule } from '@rx-angular/template';
import { RunOutsideZoneDirective } from './runOutsideZone.directive';

const DECLARATIONS = [LoadTestComponent, RunOutsideZoneDirective];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [CommonModule, TemplateModule, UnpatchEventsModule],
  exports: [DECLARATIONS],
})
export class SharedModule {}

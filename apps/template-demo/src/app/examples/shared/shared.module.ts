import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { LoadTestComponent } from './loadtest/load-test.component';
import { TemplateModule, UnpatchEventsModule } from '@rx-angular/template';
import { RunOutsideZoneDirective } from './runOutsideZone.directive';
import { DebugHelperModule } from '../../debug-helper.module.ts/debug-helper.module';

const DECLARATIONS = [LoadTestComponent, RunOutsideZoneDirective];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    TemplateModule,
    UnpatchEventsModule,
    MatButtonModule,
    MatIconModule,
    DebugHelperModule
  ],
  exports: [DECLARATIONS, DebugHelperModule]
})
export class SharedModule {}

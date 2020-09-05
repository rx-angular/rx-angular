import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { LoadTestComponent } from './loadtest/load-test.component';
import { PushModule, TemplateModule, UnpatchEventsModule } from '@rx-angular/template';
import { RunOutsideZoneDirective } from './runOutsideZone.directive';
import { DebugHelperModule } from '../debug-helper.module.ts/debug-helper.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ListItemGhostComponent } from './list-item-ghost/list-item-ghost.component';
import { FormGhostComponent } from './form-ghost/form-ghost.component';

const DECLARATIONS = [ListItemGhostComponent,FormGhostComponent, LoadTestComponent, RunOutsideZoneDirective];
const IMPORTS = [
  CommonModule,
  TemplateModule,
  UnpatchEventsModule,
  PushModule,
  DebugHelperModule,
  NgxSkeletonLoaderModule
];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [IMPORTS],
  exports: [DECLARATIONS, IMPORTS]
})
export class SharedModule {}

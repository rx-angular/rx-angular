import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PushModule, TemplateModule, UnpatchEventsModule } from '@rx-angular/template';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ListItemGhostComponent } from './list-item-ghost/list-item-ghost.component';
import { FormGhostComponent } from './form-ghost/form-ghost.component';

const DECLARATIONS = [
  ListItemGhostComponent,
  FormGhostComponent
];
const IMPORTS = [
  CommonModule,
  TemplateModule,
  UnpatchEventsModule,
  PushModule,
  NgxSkeletonLoaderModule
];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [IMPORTS],
  exports: [DECLARATIONS, IMPORTS]
})
export class GhostElementsModule {
}


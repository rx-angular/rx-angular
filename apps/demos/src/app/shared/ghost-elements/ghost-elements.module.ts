import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PushModule } from '@rx-angular/template/push';
import { LetModule } from '@rx-angular/template/let';
import { UnpatchModule } from '@rx-angular/template/unpatch';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ListItemGhostComponent } from './list-item-ghost/list-item-ghost.component';
import { FormGhostComponent } from './form-ghost/form-ghost.component';

const DECLARATIONS = [ListItemGhostComponent, FormGhostComponent];
const IMPORTS = [
  CommonModule,
  LetModule,
  PushModule,
  UnpatchModule,
  PushModule,
  NgxSkeletonLoaderModule,
];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [IMPORTS],
  exports: [DECLARATIONS, IMPORTS],
})
export class GhostElementsModule {}

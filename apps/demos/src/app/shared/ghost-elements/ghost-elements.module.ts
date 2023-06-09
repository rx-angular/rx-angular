import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxPush } from '@rx-angular/template/push';
import { RxLet } from '@rx-angular/template/let';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ListItemGhostComponent } from './list-item-ghost/list-item-ghost.component';
import { FormGhostComponent } from './form-ghost/form-ghost.component';

const DECLARATIONS = [ListItemGhostComponent, FormGhostComponent];
const IMPORTS = [
  CommonModule,
  RxLet,
  RxPush,
  RxUnpatch,
  NgxSkeletonLoaderModule,
];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [IMPORTS],
  exports: [DECLARATIONS, IMPORTS],
})
export class GhostElementsModule {}

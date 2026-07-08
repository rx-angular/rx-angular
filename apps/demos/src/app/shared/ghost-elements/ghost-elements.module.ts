import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RxLet } from '@rx-angular/template/let';
import { RxPush } from '@rx-angular/template/push';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormGhostComponent } from './form-ghost/form-ghost.component';
import { ListItemGhostComponent } from './list-item-ghost/list-item-ghost.component';

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

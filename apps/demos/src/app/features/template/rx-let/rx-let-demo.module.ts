import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './rx-let.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
})
export class RxLetDemoModule {}

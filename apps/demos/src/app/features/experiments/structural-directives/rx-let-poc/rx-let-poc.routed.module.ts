import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RxLetPocModule } from './rx-let-poc.module';
import { ROUTES } from './rx-let-poc.routes';

@NgModule({
  imports: [RxLetPocModule, RouterModule.forChild(ROUTES)],
})
export class RxLetPocRoutedModule {}

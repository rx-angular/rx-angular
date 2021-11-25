import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './rx-let-poc.routes';
import { RxLetPocModule } from './rx-let-poc.module';

@NgModule({
  imports: [RxLetPocModule, RouterModule.forChild(ROUTES)],
})
export class RxLetPocRoutedModule {}

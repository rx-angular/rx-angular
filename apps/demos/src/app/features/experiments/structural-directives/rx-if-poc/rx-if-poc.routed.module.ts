import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './rx-if-poc.routes';
import { RxIfPocModule } from './rx-if-poc.module';

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    RxIfPocModule
  ]
})
export class RxIfPocRoutedModule {
}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './rx-for-poc.routes';
import { RxForPocModule } from './rx-for-poc.module';

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    RxForPocModule
  ]
})
export class RxForPocRoutedModule {
}

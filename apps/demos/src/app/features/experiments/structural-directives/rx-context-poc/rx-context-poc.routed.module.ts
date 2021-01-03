import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './rx-context-poc.routes';
import { RxContextPocModule } from './rx-context-poc.module';

@NgModule({
  imports: [RxContextPocModule, RouterModule.forChild(ROUTES)],
})
export class RxContextPocRoutedModule {}

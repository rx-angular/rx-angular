import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './rx-context.routes';
import { RxContextDemoModule } from './rx-context.module';

@NgModule({
  imports: [RxContextDemoModule, RouterModule.forChild(ROUTES)],
})
export class RxContextRoutedModule {}

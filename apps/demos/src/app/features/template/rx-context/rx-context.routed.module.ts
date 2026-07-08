import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RxContextDemoModule } from './rx-context.module';
import { ROUTES } from './rx-context.routes';

@NgModule({
  imports: [RxContextDemoModule, RouterModule.forChild(ROUTES)],
})
export class RxContextRoutedModule {}

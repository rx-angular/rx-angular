import { NgModule } from '@angular/core';
import { ClassDirective } from './class.directive';

@NgModule({
  declarations: [ClassDirective],
  exports: [ClassDirective]
})
export class ClassModule {}

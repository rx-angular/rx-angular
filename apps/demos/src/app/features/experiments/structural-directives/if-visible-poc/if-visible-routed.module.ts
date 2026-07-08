import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IfVisibleModule } from './if-visible.module';
import { ROUTES } from './if-visible.routes';

@NgModule({
  imports: [IfVisibleModule, RouterModule.forChild(ROUTES)],
})
export class IfVisibleRoutedModule {}

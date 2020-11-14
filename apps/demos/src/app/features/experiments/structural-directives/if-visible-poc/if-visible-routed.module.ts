import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './if-visible.routes';
import { IfVisibleModule } from './if-visible.module';

@NgModule({
  imports: [IfVisibleModule, RouterModule.forChild(ROUTES)],
})
export class IfVisibleRoutedModule {}

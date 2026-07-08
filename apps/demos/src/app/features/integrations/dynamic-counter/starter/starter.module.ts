import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { StarterComponent } from './starter.component';
import { ROUTES } from './starter.routes';

const DECLARATIONS = [StarterComponent];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(ROUTES), ...DECLARATIONS],
})
export class StarterModule {}

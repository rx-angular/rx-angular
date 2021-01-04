import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatefulComponent } from './stateful.component';

const routes: Routes = [{
  path: '',
  component: StatefulComponent
}]

@NgModule({
  declarations: [StatefulComponent],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class StatefulModule { }

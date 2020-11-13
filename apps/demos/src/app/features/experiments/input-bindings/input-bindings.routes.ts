import { Routes } from '@angular/router';
import { InputBindingsContainerComponent } from './input-bindings-container/input-bindings-container.component';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'input-bindings'
  },
  {
    path: 'input-bindings',
    component: InputBindingsContainerComponent
  }
];

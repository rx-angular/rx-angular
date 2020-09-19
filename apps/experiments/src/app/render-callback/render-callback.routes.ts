import { Routes } from '@angular/router';
import { RenderCallback01Component } from './01/render-callback-01.component';
import { RenderCallbackOverviewComponent } from './render-callback-overview.component';


export const RENDER_CALLBACK_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'render-callback',
    component: RenderCallbackOverviewComponent,
  },
  {
    path: 'render-callback',
    component: RenderCallbackOverviewComponent,
  },
  {
    path: 'render-callback-01',
    component: RenderCallback01Component,
  }
];

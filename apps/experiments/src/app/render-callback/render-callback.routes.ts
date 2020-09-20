import { Routes } from '@angular/router';
import { RenderCallback01Component } from './01/render-callback-01.component';
import { RenderCallback02Component } from './02/render-callback-02.component';
import { RenderCallback03Component } from './03/render-callback-03.component';
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
  },
  {
    path: 'render-callback-02',
    component: RenderCallback02Component,
  },
  {
    path: 'render-callback-03',
    component: RenderCallback03Component,
  }
];

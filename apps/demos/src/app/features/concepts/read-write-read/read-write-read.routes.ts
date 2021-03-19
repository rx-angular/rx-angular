import { ReadWriteReadComponent } from './read-write-read/read-write-read.component';

export const ROUTES = [
  {
    path: '',
    component: ReadWriteReadComponent,
    children: [{
      path: '',
      loadChildren: () => import('./read-write-read/fast-dom-renderer/fast-dom-renderer.module')
        .then(m => m.FastDomRendererModule),
    }],
  },
];

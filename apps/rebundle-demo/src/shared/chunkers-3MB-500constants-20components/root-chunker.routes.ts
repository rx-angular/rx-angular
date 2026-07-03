import { Route } from '@angular/router';
import { chunkRoutes } from './chunk.routes';
import { RootChunkerComponent } from './root-chunker.component';

export const rootChunkerRoutes: Route[] = [
  {
    path: '',
    component: RootChunkerComponent,
    children: chunkRoutes,
  },
];

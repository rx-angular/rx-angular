import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpeculativeLinkComponent } from './speculative-link.component';
import { SpeculativeLinkService } from './speculative-link.service';

const ROUTES: Routes = [
  {
    path: '',
    component: SpeculativeLinkComponent,
  },
  {
    path: 'detail/:id',
    loadComponent: () =>
      import('./speculative-link-detail/speculative-link-detail.component').then(
        (m) => m.SpeculativeLinkDetailComponent,
      ),
    data: {
      preResolve: ({ params, data }) => {
        const service = inject(SpeculativeLinkService);
        const id = params['id'];
        console.log('Pre-resolving data for id:', id);
        service.logResolve(id);

        data['preResolvedData'] = {
          id,
          name: 'Item ' + id,
          preResolvedAt: new Date().toISOString(),
        };
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
})
export class SpeculativeLinkModule {}

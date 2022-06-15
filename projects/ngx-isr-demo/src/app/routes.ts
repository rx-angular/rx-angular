import { Routes } from '@angular/router';

const DetailsComponent = () => import('./details.component').then(x => x.DetailsComponent);
const PageOneComponent = () => import('./page-one.component').then(x => x.PageOneComponent);
const PageTwoComponent = () => import('./page-two.component').then(x => x.PageTwoComponent);
const PageThreeComponent = () => import('./page-three.component').then(x => x.PageThreeComponent);

export const routes: Routes = [
  {
    path: "one",
    loadComponent: PageOneComponent,
    title: 'Page One',
  },
  {
    path: "two",
    loadComponent: PageTwoComponent,
    data: { revalidate: 5 },
    title: 'Page Two',
  },
  {
    path: "three",
    loadComponent: PageThreeComponent,
    data: { revalidate: 0 },
    title: 'Page Three',
  },
  {
    path: "details/:id",
    loadComponent: DetailsComponent,
    data: { revalidate: 10 },
    title: 'Details',
  },
]
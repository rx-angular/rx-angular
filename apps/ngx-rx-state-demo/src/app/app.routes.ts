import { ROUTES as DEMO_BASICS_ROUTES } from './examples/demo-basics/demo-basics.module';

export const ROUTES = [
  {
    path: '',
    redirectTo: 'demo-basics'
  },
  { path: 'demo-basics', children: DEMO_BASICS_ROUTES }
];

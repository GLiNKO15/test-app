import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./test-demo/test-demo.component').then(
      comp => comp.TestDemoComponent
    )
  }
];

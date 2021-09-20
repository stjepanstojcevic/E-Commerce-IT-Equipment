import { Routes } from '@angular/router';

export const CONTENT_ROUTES_ABOUT: Routes = [
  {
    path: '',
    loadChildren: () => import('@module/about/about.module').then(m => m.AboutModule)
  }
  
];

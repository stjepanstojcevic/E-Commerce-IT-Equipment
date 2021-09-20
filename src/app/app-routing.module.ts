import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CONTENT_ROUTES_ABOUT } from '@app/shared';
import { AuthGuard } from '@app/core';

import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/shop/products',
    pathMatch: 'full'
  },
  {
    path: 'about',
    component: DefaultLayoutComponent,
    children: CONTENT_ROUTES_ABOUT
  },
  {
    path: 'shop',
    component: DefaultLayoutComponent,
    loadChildren: () => import('@module/web-shop/web-shop.module').then(m => m.WebShopModule)
  },
  {
    path: 'dashboard',
    component: DefaultLayoutComponent,
    loadChildren: () => import('@module/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'account',
    component: AuthLayoutComponent,
    loadChildren: () => import('@module/auth/auth.module').then(m => m.AuthModule)
  },
  // Fallback when no prior routes is matched
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }

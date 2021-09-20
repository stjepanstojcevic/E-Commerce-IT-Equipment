import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CONTENT_ROUTES_SHOP } from '@app/shared/routes/shop-layout.routes';

const routes: Routes = [
  { path: '', redirectTo: '/shop/products', pathMatch: 'full' },
  { path: '', children: CONTENT_ROUTES_SHOP }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebShopRoutingModule { }

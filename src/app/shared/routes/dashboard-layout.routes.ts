import { Routes } from '@angular/router';
import { ManageProductComponent } from '@app/modules/dashboard/pages/manage-product/manage-product.component';

export const CONTENT_ROUTES_DASHBOARD: Routes = [
  { path: 'products', component:  ManageProductComponent, },
  { path: 'products/:id', component:  ManageProductComponent, },
];

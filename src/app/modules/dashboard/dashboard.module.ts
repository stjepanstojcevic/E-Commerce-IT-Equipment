import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard.routing';
import { SharedModule } from '@app/shared';

import { ManageProductComponent } from './pages/manage-product/manage-product.component';

@NgModule({
  declarations: [
    ManageProductComponent
  ],
  imports: [
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule {  }

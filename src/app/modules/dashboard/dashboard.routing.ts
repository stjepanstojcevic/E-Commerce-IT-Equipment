import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CONTENT_ROUTES_DASHBOARD } from '@app/shared/routes/dashboard-layout.routes';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard/account', pathMatch: 'full' },
  { path: '', children: CONTENT_ROUTES_DASHBOARD }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

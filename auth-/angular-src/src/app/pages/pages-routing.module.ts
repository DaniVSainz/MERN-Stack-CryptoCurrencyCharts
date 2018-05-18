import { ChartComponent } from './chart/chart.component';
import { AuthGuard } from './../services/auth-guard.service';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VerificationComponent } from './verification/verification.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    // {
    //   path: 'dashboard',
    //   component: DashboardComponent,
    // },
    {
      path: 'tables',
      loadChildren: './tables/tables.module#TablesModule',
    },
    {
      path: '',
      redirectTo: 'tables/smart-table',
      pathMatch: 'full',
    },
    {
      path: 'charts',
      loadChildren: './charts/charts.module#ChartsModule',
    },
    {
      path: 'chart/:symbol',
      component: ChartComponent,
    },
    {
      path: 'verification/:token',
      component: VerificationComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}

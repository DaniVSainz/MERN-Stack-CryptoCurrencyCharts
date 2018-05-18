import { DataApiService } from './../services/data-api.service';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { ChartComponent } from './chart/chart.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { VerificationComponent } from './verification/verification.component';



const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    NgxEchartsModule
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    ChartComponent,
    VerificationComponent,
  ],
  providers:[
    DataApiService
  ]
})
export class PagesModule {
}

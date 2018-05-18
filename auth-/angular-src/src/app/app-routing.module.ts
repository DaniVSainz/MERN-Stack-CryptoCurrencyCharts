import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { 
  NgxResetPasswordComponent,
  NgxAuthComponent,
  NgxLoginComponent,
  NgxRegisterComponent,
  NgxLogoutComponent,
  NgxRequestPasswordComponent
} from './auth2';
import { AuthGuard } from './services/auth-guard.service';
// import { NgxAuthComponent,NgxLoginComponent, NgxRegisterComponent, NgxLogoutComponent,NgxRequestPasswordComponent,NgxResetPasswordComponent} from './@theme/components/auth';





const routes: Routes = [
  { path: 'pages', 
    // canActivate: [AuthGuard],
    loadChildren: 'app/pages/pages.module#PagesModule' },
  {
    path: 'auth',
    component: NgxAuthComponent,
    children: [
      {
        path: '',
        component: NgxLoginComponent,
      },
      {
        path: 'login',
        component: NgxLoginComponent,
      },
      {
        path: 'register',
        component: NgxRegisterComponent,
      },
      {
        path: 'logout',
        component: NgxLogoutComponent,
      },
      {
        path: 'request-password',
        component: NgxRequestPasswordComponent,
      },
      {
        path: 'reset-password/:token',
        component: NgxResetPasswordComponent,
      },
    ],
  },
  { path: '#/**', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },

];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

//Nebular Auth
import { NbEmailPassAuthProvider, NbAuthModule } from './auth2';
import { NB_AUTH_TOKEN_CLASS, NbAuthJWTToken } from './auth2';

//Our authguard service to protect routes
import { AuthGuard } from './services/auth-guard.service';
import { HttpModule } from '@angular/http';
import { MyAuthService } from './services/my-auth.service';
import { getDeepFromObject } from './auth2/helpers';

let url = environment.urlUsers;

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    HttpModule,

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    NbAuthModule.forRoot({
      providers: {
        email: {
          service: NbEmailPassAuthProvider,
          config: {
            baseEndpoint: url,
            login: {
              endpoint: '/users/authenticate',
              method: 'post',
              rememberMe: false,   // whether to show or not the `rememberMe` checkbox
            },
            register: {
              endpoint: '/users/register',
              method: 'post',
            },
            logout: {
               endpoint: '/auth/sign-out',
               method: 'post',
             },
             requestPass: {
               endpoint: '/confirmation/reset',
               method: 'post',
             },
             resetPass: {
               endpoint: '/confirmation/reset/password',
               method: 'post',
             },
             token: {
              key: 'token', // this parameter tells Nebular where to look for the token
            },
          },
        },
      },
      forms: {
        login: {
          endpoint: '/users/authenticate',
          provider: 'email',
          method: 'post',
          redirectDelay: 2000,
          rememberMe: false,   // whether to show or not the `rememberMe` checkbox
          showMessages: {     // show/not show success/error messages
            success: true,
            error: true,
          }
        },
        register: {
          redirectDelay: 2000,
          provider: 'email',
          showMessages: {
            success: true,
            error: true,
          },
          terms: true,
        },
      },
    }), 
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: NB_AUTH_TOKEN_CLASS, useValue: NbAuthJWTToken },
    AuthGuard,MyAuthService
  ],
})
export class AppModule {
}

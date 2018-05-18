/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService) {
  }

  ngOnInit() {
    this.analytics.trackPageViews();
    //This snippet works as Angular SW wont load correctly.
    // if ('serviceWorker' in navigator && environment.production) {
    //   window.addEventListener('load', function () {
    //       navigator.serviceWorker.register('ngsw-worker.js')
    //       .then(function (registration) {
    //           console.log('ServiceWorker registration successful with scope: ', registration.scope);
    //       }).catch(function (err) {
    //           console.error('ServiceWorker registration failed: ', err);
    //       });
    //   });
    //   }
  }
}

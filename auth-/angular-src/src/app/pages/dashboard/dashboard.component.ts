import { DataApiService } from './../../services/data-api.service';
import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  constructor( private dataService:DataApiService ){

  }

  ngOnInit() {
  }
  
}

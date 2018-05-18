import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataApiService {

  constructor(private http: Http,) {}

  url:string =environment.url;

  top100() {
    return this.http.get(`${this.url}/coinmarketcap/getall`)
      .map(res => res.json());
  }

  getPairData(symbol) {
    return this.http.get(`${this.url}/binance/getpairdata/${symbol}`)
      .map(res => res.json());
  }



}

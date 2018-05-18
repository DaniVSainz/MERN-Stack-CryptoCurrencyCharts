import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';

@Injectable()
export class MyAuthService {
  authToken: any;
  user: any;

  constructor(private http: Http,
              private router:Router) {
      // this.isDev = true;  // Change to false before deployment
      }


  // registerUser(user) {
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.post('users/register', user, {headers: headers}).map(res=> res.json());
  // }
  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('users/register', user, {headers: headers}).map(res=> res.json());
  }

  verifyEmail(token){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log('before post')
    return this.http.post('confirmation/verifyEmail', {token}, {headers: headers})
      .map(res => res.json());
  }

  resendVerificationEmail(email){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log('before post')
    return this.http.post('confirmation//verifyEmail/resend', {email}, {headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('users/authenticate', user, {headers: headers})
      .map(res => res.json());
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('users/profile', {headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
    this.router.navigate(['']);
  }

  resetPasswordRequest(email){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log('before post')
    return this.http.post('confirmation/reset', {email: email}, {headers: headers})
      .map(res => res.json());
  }

  resetPasswordRequestSubmission(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('confirmation/reset/password', user , {headers: headers})
      .map(res => res.json());
  }

  deleteUser(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.delete('users/delete', {headers: headers})
      .map(res => res.json());
  }
}
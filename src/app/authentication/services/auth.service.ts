import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserDatastoreService } from './user-datastore.service';
import { JwtDecodeService } from './jwt-decode.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private userDatastoreService: UserDatastoreService,
    private jwtDecodeService: JwtDecodeService) { }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token != null;
  }

  login(username: string, password: string) {
    var data = this.userDatastoreService.new();

    //@ts-ignore
    data.id = 0;
    data.attributes.username = username;
    data.attributes.password = password;
    data.attributes["first-name"] = username;
    data.attributes["last-name"] = username;
    data.attributes["confirm-password"] = password;

    const reqHeader = { headers: new HttpHeaders({ 'Content-Type': 'application/vnd.api+json' }) };

    return this.http.post<any>(environment.BACK_END_HOST + 'users/authenticate', { data }, reqHeader)
      .pipe(
        map(user => {
          localStorage.setItem('token', user.Token);
          localStorage.setItem('username', user.Username);
          localStorage.setItem('roles', this.jwtDecodeService.decodeToken(user.Token)['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
          localStorage.setItem('userid', this.jwtDecodeService.decodeToken(user.Token)['user_id']);
          localStorage.setItem('clientid', this.jwtDecodeService.decodeToken(user.Token)['client_id']);
          localStorage.setItem('expires', this.jwtDecodeService.decodeToken(user.Token)['exp']);

          return true;
        })
      );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUsername() {
    return localStorage.getItem('username');
  }

  getUserId() {
    return localStorage.getItem('userid');
  }

  getClientId() {
    return localStorage.getItem('clientid');
  }

  getRoles() {
    var roles = localStorage.getItem('roles');
    if (roles) {
      return roles.split(',');
    }
    else {
      return [];
    }
  }

  tokenHasExpired() {
    var convertDate = parseInt(localStorage.getItem('expires')) * 1000;
    var expireDate = new Date(convertDate);
    var currentDate = new Date();

    return currentDate > expireDate;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('roles');
    localStorage.removeItem('userid');
    localStorage.removeItem('clientid');
    localStorage.removeItem('expires');
    this.router.navigate(['/login']);
  }
}
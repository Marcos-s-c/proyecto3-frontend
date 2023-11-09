import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { baserUrl } from './helper';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public loginStatusSubjec = new Subject<boolean>();
  constructor(private http: HttpClient) {}

  //generamos el token
  public generateToken(loginData: any) {
    return this.http.post(`${baserUrl()}/rest/auth/login`, loginData);
  }

  public getCurrentUser() {
    return this.http.get(`${baserUrl()}/actual-usuario`);
  }

  //iniciamos sesión y establecemos el token en el localStorage
  public loginUser(token: any) {
    localStorage.setItem('token', token);
    return true;
  }

  public isLoggedIn() {
    if (!localStorage.getItem('token')) {
      return false;
    } else {
      return true;
    }
  }

  //cerranis sesion y eliminamos el token del localStorage
  public logout() {
    this.http.get(`${baserUrl()}/rest/users/logout`).subscribe((response) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    });
    return true;
  }

  //obtenemos el token
  public getToken() {
    return localStorage.getItem('token');
  }

  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  public getUserRole() {
    let user = this.getUser();
    console.log(user.rol);
    return user;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  public añadirUsuario(user: any) {
    return this.httpClient.post(`${baserUrl}/rest/auth/register`, user);
  }

  public reiniciarContraseña(email: any) {
    console.log(email);
    return this.httpClient.post(
      `${baserUrl}/rest/auth/enviarCorreoReset`,
      email
    );
  }

  public changePassword(passcode: any) {
    return this.httpClient.post(
      `${baserUrl}/rest/auth/recuperarContra`,
      passcode

      
    );
  }
}

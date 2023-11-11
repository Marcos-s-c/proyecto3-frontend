import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {baserUrl} from './helper';
import {User} from "../pages/perfil-usuario/perfil-usuario.component";
import {ResetContraRequestBody} from "../interface/ResetContraRequestBody";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public ret:string ="";
  constructor(private httpClient: HttpClient) {}

  public añadirUsuario(user: any) {
    return this.httpClient.post(`${baserUrl()}/rest/auth/register`, user);
  }

  public actualizarUsuario(user:User){
    return this.httpClient.put(`${baserUrl()}/rest/users/actualizar`, user);
  }

  public reiniciarContraseña(email: any) {
    return this.httpClient.post(
      `${baserUrl()}/rest/auth/enviarCorreoReset`,
      email
    );
  }

  public changePassword(passcode: any) {
    return this.httpClient.post(
      `${baserUrl()}/rest/auth/recuperarContra`,
      passcode
    );
  }

  public sendEmailLanding(contact: any){
    return this.httpClient.post(
      `https://formspree.io/f/meqbdkge`,
      contact
    );
  }

  public getUser(email:string){
    return this.httpClient.get(`${baserUrl()}/rest/auth/recuperarContra`, )
  }

  public compara(body: ResetContraRequestBody):any{
    return this.httpClient.post(`${baserUrl()}/rest/users/concordar`, body)
}

}

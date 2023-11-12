import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { baserUrl } from './helper';

@Injectable({
  providedIn: 'root',
})
export class MedicineService {
  constructor(private http: HttpClient) {}
  //generamos el token
  public saveMedicine(medicine: any) {
    return this.http.post(`${baserUrl()}/rest/medicines/add`, medicine);
  }

  public getMedicines(medicine: any) {
    return this.http.get(`${baserUrl()}/rest/medicines/get`, medicine);
  }
}

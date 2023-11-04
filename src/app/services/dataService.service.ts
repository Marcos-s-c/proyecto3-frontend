import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

type DataObject = {
    userId: number,
    fieldName: string;
    value: any;
    date: Date;
};

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http:HttpClient) { }
  public addPeriodCriteriaList(dataArrayList: Array<DataObject>){
    return this.http.post(`${baserUrl}/rest/period-criteria/create`, dataArrayList);
  }
}


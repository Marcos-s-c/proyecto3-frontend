import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baserUrl } from './helper';
import { DataObject } from '../pages/user/user-dashboard/user-dashboard.component';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  public addPeriodCriteriaList(dataArrayList: Array<DataObject>) {
    return this.http.post(
      `${baserUrl()}/rest/period-criteria/create`,
      dataArrayList
    );
  }

  public getExistingData(today: string) {
    return this.http.get(
      `${baserUrl()}/rest/period-criteria/getPeriodCriteriaByDate?date=${today}`
    );
  }

  public getExistingDataById() {
    return this.http.get(
      `${baserUrl()}/rest/period-criteria/getPeriodCriteriaByUser`
    );
  }

  public getAveragePeriod() {
    return this.http.get(
        `${baserUrl()}/rest/period-criteria/periodDuration`
    );
  }
  public getNextPeriodDate() {
    return this.http.get(
        `${baserUrl()}/rest/period-criteria/nextPeriodDate`
    );
  }
}

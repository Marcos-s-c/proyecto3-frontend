import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baserUrl } from './helper';

@Injectable({
  providedIn: 'root',
})

export class NotificationService{

    constructor(private http: HttpClient) {}

    public getAllNotifications(){
        return this.http.get(`${baserUrl()}/rest/notifications/getAllPosts`)
    }

    public readAllNotifications(){
        return this.http.get(`${baserUrl()}/rest/notifications/readNotifications`)
    }
}
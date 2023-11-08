import { DataService } from './../../../services/dataService.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-calendar',
  templateUrl: './user-calendar.component.html',
  styleUrls: ['./user-calendar.component.scss'],
})
export class UserCalendarComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    const data = this.getDataById();
  }

  getDataById() {
    this.dataService.getExistingDataById().subscribe((response: any) => {
      console.log(response);
    });
  }
}

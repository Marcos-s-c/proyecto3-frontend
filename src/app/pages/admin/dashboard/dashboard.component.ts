import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatListModule} from "@angular/material/list";
import {UserService} from "../../../services/user.service";
import {MatButtonModule} from "@angular/material/button";
import {NgClass} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatListModule, MatButtonModule, NgClass, FormsModule, MatInputModule],
})


export class DashboardComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'email', 'phone', 'has_device', 'action'];

  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  activeButton: "test";
  searchTerm: any;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data: any)=>{
      console.log(data);
      this.dataSource = new MatTableDataSource<User>(data);
    })
  }

  search() {

  }
}

export interface User {
  name: string;
  email: string;
  phone: string;
  active: boolean;
  hasDevice: boolean;
  user_id: number;
}





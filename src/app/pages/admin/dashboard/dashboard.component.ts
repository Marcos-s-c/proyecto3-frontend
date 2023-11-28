import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatListModule} from "@angular/material/list";
import {UserService} from "../../../services/user.service";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatListModule, MatButtonModule],
})


export class DashboardComponent implements OnInit, AfterViewInit {
 // displayedColumns: string[] = ['Nombre', 'Correo electrónico', 'Número telefónico', 'Activar/Desactivar'];
  displayedColumns: string[] = ['name', 'email', 'phone', 'has_device', 'active', 'actions'];

  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  activeButton: "test";


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

  onButtonClick() {

  }
}

export interface User {
  name: string;
  email: string;
  phone: string;
  active: boolean;
  hasDevice: boolean;
}





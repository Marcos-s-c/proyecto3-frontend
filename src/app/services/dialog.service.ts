import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogDataComponent } from '../components/dialog-data/dialog-data.component';
import { PeriodData } from '../interfaces/period-data';

@Injectable()
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openDialog(data: PeriodData): void {
    const dialogRef = this.dialog.open(DialogDataComponent, {
      width: '80%', // Puedes ajustar el ancho según tus necesidades
      data, // Pasa los datos al componente de diálogo
    });
  }
}

import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle
} from "@angular/material/dialog";
import {ComponentType} from "@angular/cdk/overlay";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-modal-editar-medicina',
  templateUrl: 'modal-editar-medicina.component.html',
  styleUrls: ['./modal-editar-medicina.component.scss'],
})
export class ModalEditarMedicinaComponent implements OnInit{

  public medicine_id: number;
  public name: string = '';
  public dosis: string = '';
  public frecuencia: string = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data:any) {
    this.medicine_id = data.medicine_id;
  }

  frecuencias: string[] = [];
  anadeFrecuencias(){
    this.frecuencias.push('Una dosis diaria')
    this.frecuencias.push('Dos dosis diarias')
    this.frecuencias.push('Tres dosis diarias')
    this.frecuencias.push('Una dosis semanal')
    this.frecuencias.push('Una dosis mensual')
    this.frecuencias.push('Indefinida')
  }

  ngOnInit(): void {
    this.anadeFrecuencias()
  }

  formSubmit(event: any) {
    console.log('form submitted');
    console.log(event.target);
    console.log('name', this.name);
    console.log('dosis', this.dosis);
    console.log('frecuencia', this.frecuencia);
  }


}


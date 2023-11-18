import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from "@angular/material/dialog";
import { FormsModule } from '@angular/forms';
import {MedicineService} from "../../../services/medicine.service";

@Component({
  selector: 'app-modal-editar-medicina',
  templateUrl: 'modal-editar-medicina.component.html',
  styleUrls: ['./modal-editar-medicina.component.scss'],
})
export class ModalEditarMedicinaComponent implements OnInit{

  public medicine_id: number;
  public name: string ;
  public dosis: string;
  public frecuencia: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any, public dialogRef: MatDialogRef<ModalEditarMedicinaComponent>,  private medServervice: MedicineService) {
    this.medicine_id = data.medicine_id;
  }

  // public medicina = {
  //   medicine_id: 0,
  //   name: '',
  //   dosis:'',
  //   frecuencia:''
  // }

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

  formSubmit() {
    console.log('form submitted');
    console.log('name', this.name);
    console.log('dosis', this.dosis);
    console.log('frecuencia', this.frecuencia);

    this.medServervice.getAllMedicamentos().subscribe((response:any) => {
      console.log('response ', response)
    })
  }

}


import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/dataService.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

export type DataObject = {
  fieldName: string;
  value: any;
  date: Date;
};

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  date!: Date;
  periodCuant!: String;
  periodColor!: String;
  fluidCuant!: String;
  fluidColor!: String;
  openedForm: boolean = false;
  emocionalState!: number;
  fisicalState!: number;
  sleepHours!: number;
  temperature!: number;
  meds: Array<String> = new Array();
  dataArrayList: Array<DataObject> = [];
  constructor(private dataService:DataService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
  }

  createDataArrayList() {
    this._snackBar.open("Sus Datos han sido guardados",undefined,{
      duration: 5 * 1000,
    });
    if(this.date == undefined) this.date = new Date();
    this.dataArrayList.push({ fieldName:"periodAmount", value: this.periodCuant,  date: this.date });
    this.dataArrayList.push({ fieldName:"periodColor", value: this.periodColor,  date: this.date });
    this.dataArrayList.push({ fieldName:"fluidAmount", value: this.fluidCuant,  date: this.date });
    this.dataArrayList.push({ fieldName:"fluidColor", value: this.fluidColor,  date: this.date});
    this.dataArrayList.push({ fieldName:"emoctonalState", value: this.emocionalState, date: this.date});
    this.dataArrayList.push({ fieldName:"physicalState", value: this.fisicalState,  date: this.date });
    this.dataArrayList.push({ fieldName:"sleepHours", value: this.sleepHours,  date: this.date});
    this.dataArrayList.push({ fieldName:"temperature", value: this.temperature,  date: this.date});
    this.dataService.addPeriodCriteriaList(this.dataArrayList).subscribe(
      (data:any) => {
          this._snackBar.open("Sus Datos han sido guardados",undefined,{duration: 5 * 1000,
    });
      },(error:any) => {
        this._snackBar.open("Ocurrio un problema con el guardado de sus datos",undefined,{ duration: 5 * 1000})
      }
    )
  }

  closeForm(){
    this.openedForm = false;
  }

  send(): number { 
    console.log(this.date);
    if(!this.isDateBeforeToday(this.date)){
      this._snackBar.open("No se pueden enviar datos en dias posteriores al actual",undefined,{duration: 5 * 1000});
     return 0;
    }
    this.createDataArrayList();
    this.closeForm();
    return 0;
  }

  isDateBeforeToday(dateToCheck: Date): boolean {
    const today = new Date();
    const todayNumeric = Date.parse(today.toString());
    const dateToCheckNumeric = Date.parse(dateToCheck.toString());
    return dateToCheckNumeric < todayNumeric;
  }
}

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
  painType!: String;
  emotionType!: String;
  fluidColor!: String;
  openedForm: boolean = false;
  emocionalState!: number;
  fisicalState!: number;
  sleepHours!: number;
  sexTimes!: number;
  temperature!: number;
  meds: Array<String> = new Array();
  dataArrayList: Array<DataObject> = [];
  constructor(private dataService:DataService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
  }

  createDataArrayList() {
    //define date
    if(this.date == undefined) this.date = new Date();
    //push data to array
    this.dataArrayList.push({ fieldName:"periodAmount", value: this.periodCuant.toString(),  date: this.date });
    this.dataArrayList.push({ fieldName:"periodColor", value: this.periodColor.toString(),  date: this.date });
    this.dataArrayList.push({ fieldName:"fluidAmount", value: this.fluidCuant.toString(),  date: this.date });
    this.dataArrayList.push({ fieldName:"fluidColor", value: this.fluidColor.toString(),  date: this.date});
    this.dataArrayList.push({ fieldName:"emoctonalState", value: this.emocionalState.toString(), date: this.date});
    this.dataArrayList.push({ fieldName:"physicalState", value: this.fisicalState.toString(),  date: this.date });
    this.dataArrayList.push({ fieldName:"sleepHours", value: this.sleepHours.toString(), date: this.date});
    this.dataArrayList.push({ fieldName:"temperature", value: this.temperature.toString(), date: this.date});
    this.dataArrayList.push({ fieldName:"sexTimes", value: this.sexTimes.toString(), date: this.date});
    this.dataArrayList.push({ fieldName:"painType", value: this.painType.toString(), date: this.date});
    this.dataArrayList.push({ fieldName:"emotionType", value: this.emotionType.toString(), date: this.date});
  //send to be
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

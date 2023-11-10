import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/dataService.service';
import {MatSnackBar} from '@angular/material/snack-bar';

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

  date!: any;
  periodCycle!: String | null;
  opened = false;
  periodAmount!: String | null;
  periodColor!: String | null;
  fluidAmount!: String | null;
  fluidColor!: String | null;
  openedForm: boolean = false;
  emotionalState!: number | null;
  physicalState!: number | null;
  sleepHours!: number | null;
  temperature!: number | null;
  sexTimes!: number | null;
  emotionType!: String | null;
  painType!: String | null;
  meds: Array<String> = new Array();
  dataArrayList: Array<DataObject> = [];
  constructor(private dataService:DataService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    const today = new Date();
    today.setHours(today.getHours() - 6);
    this.setFormValues(today.toISOString().split('T')[0]);
    this.dataService.getAveragePeriod().subscribe(
        (data:any) =>{
          console.log(data);

        }
    );
  }

  createDataArrayList() {
    //define date
    if(this.date == undefined) this.date = new Date();
    if(this.periodCycle)this.dataArrayList.push({ fieldName:"periodCycle", value: this.periodCycle?.toString(),  date: this.date });
    if(this.periodAmount)this.dataArrayList.push({ fieldName:"periodAmount", value: this.periodAmount?.toString(),  date: this.date });
    if(this.periodColor)this.dataArrayList.push({ fieldName:"periodColor", value: this.periodColor?.toString(),  date: this.date });
    if(this.fluidAmount)this.dataArrayList.push({ fieldName:"fluidAmount", value: this.fluidAmount?.toString(),  date: this.date });
    if(this.fluidColor)this.dataArrayList.push({ fieldName:"fluidColor", value: this.fluidColor?.toString(),  date: this.date});
    if(this.emotionalState)this.dataArrayList.push({ fieldName:"emotionalState", value: this.emotionalState?.toString(), date: this.date});
    if(this.physicalState)this.dataArrayList.push({ fieldName:"physicalState", value: this.physicalState?.toString(),  date: this.date });
    if(this.sleepHours)this.dataArrayList.push({ fieldName:"sleepHours", value: this.sleepHours?.toString(),  date: this.date});
    if(this.temperature)this.dataArrayList.push({ fieldName:"temperature", value: this.temperature?.toString(),  date: this.date});
    if(this.sexTimes)this.dataArrayList.push({ fieldName:"sexTimes", value: this.sexTimes?.toString(), date: this.date});
    if(this.painType)this.dataArrayList.push({ fieldName:"painType", value: this.painType?.toString(), date: this.date});
    if(this.emotionType)this.dataArrayList.push({ fieldName:"emotionType", value: this.emotionType?.toString(), date: this.date});

    if(this.dataArrayList.length> 0){
      this.dataService.addPeriodCriteriaList(this.dataArrayList).subscribe(
          (data:any) => {
            this._snackBar.open(data.Message,undefined,{duration: 5 * 1000});
            this.dataArrayList = [];
          },(error:any) => {
            if(error.error.Message){
              this._snackBar.open(error.error.Message,undefined,{ duration: 5 * 1000});
            }else{
              this._snackBar.open("Ocurrió un problema al guardar sus datos.",undefined,{ duration: 5 * 1000});
            }
            this.dataArrayList = [];
          }
      )
    }else{
      this._snackBar.open("No hay datos por enviar.",undefined,{ duration: 5 * 1000});
    }
  }

  closeForm(){
    this.openedForm = false;
  }

  send(): number {
    if(!this.isDateBeforeToday(this.date)){
      this._snackBar.open("No se pueden enviar datos en días posteriores al actual.",undefined,{duration: 5 * 1000});
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

  onDateChange(event:any):void {
    this.clearValues();
    if(event.target.value)this.setFormValues(event.target.value);

  }

  setFormValues(date:string){
    this.dataService.getExistingData(date)
    .subscribe((response:any)=>{
      this.date = date;
      if(response.length>0){
        this.periodCycle = response.find((field: DataObject) => field.fieldName == 'periodCycle').value;
        this.periodAmount = response.find((field: DataObject) => field.fieldName == 'periodAmount').value;
        this.periodColor = response.find((field: DataObject) => field.fieldName == 'periodColor').value;
        this.fluidAmount = response.find((field: DataObject) => field.fieldName == 'fluidAmount').value;
        this.fluidColor = response.find((field: DataObject) => field.fieldName == 'fluidColor').value;
        this.emotionalState = response.find((field: DataObject) => field.fieldName == 'emotionalState').value;
        this.physicalState = response.find((field: DataObject) => field.fieldName == 'physicalState').value;
        this.sleepHours = response.find((field: DataObject) => field.fieldName == 'sleepHours').value;
        this.temperature = response.find((field: DataObject) => field.fieldName == 'temperature').value;
        this.sexTimes = response.find((field: DataObject) => field.fieldName == 'sexTimes').value;
        this.emotionType = response.find((field: DataObject) => field.fieldName == 'emotionType').value;
        this.painType = response.find((field: DataObject) => field.fieldName == 'painType').value;
      }
    })
  }

  clearValues(){
        this.periodAmount = null;
        this.periodColor = null;
        this.fluidAmount = null;
        this.fluidColor = null;
        this.emotionalState = null;
        this.physicalState = null;
        this.sleepHours = null;
        this.temperature = null;
        this.sexTimes = null;
        this.emotionType = null;
        this.painType = null;
        this.periodCycle = null;
  }


}

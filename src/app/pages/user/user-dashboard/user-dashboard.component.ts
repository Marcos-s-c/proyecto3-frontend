import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/dataService.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationDataService } from 'src/app/services/notificationDataService';


export type DataObject = {
  fieldName: string;
  value: any;
  date: Date;
};


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
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
  sexTimes!: String | null;
  emotionType!: String | null;
  painType!: String | null;
  meds: Array<String> = new Array();
  dataArrayList: Array<DataObject> = [];
  optionsLineal: any = {
    title: 'Temperatura (Cº',
    axes: {
      left: {
        title: 'Grados (Cº)',
        stacked: true,
        scaleType: 'linear',
        mapsTo: 'value',
      },
      bottom: {
        title: 'Fecha',
        scaleType: 'labels',
        mapsTo: 'date',
      },
    },
    toolbar: {
      enabled: false,
    },
    curve: 'curveMonotoneX',
    height: '400px',
    width: '100%',
  };
  dataLineal: any = [];
  optionsCircle: any = {
    title: 'Vida Sexual',
    toolbar: {
      enabled: false,
    },
    legend: {
      alignment: 'center',
      position: 'right',
      orientation: 'vertical',
    },
    curve: 'curveMonotoneX',
    height: '400px',
    width: '100%',
  };
  dataCircle: any = [
    {
      group: 'Sexo con protección',
      value: 0,
    },
    {
      group: 'Sexo sin protección',
      value: 0,
    },
    {
      group: 'Deseo sexual alto',
      value: 0,
    },
    {
      group: 'Deseo sexual bajo',
      value: 0,
    },
    {
      group: 'Masturbación',
      value: 0,
    },
    {
      group: 'Orgasmo',
      value: 0,
    },
    {
      group: 'sexo con dolor',
      value: 0,
    },
    {
      group: 'Sexo interrumpido',
      value: 0,
    },
    {
      group: 'Uso de juguetes sexuales',
      value: 0,
    },
  ];
  optionsSpike: any = {
    title: 'Flujo Cervical',
    toolbar: {
      enabled: false,
    },
    axes: {
      bottom: {
        title: 'Fecha',
        mapsTo: 'key',
        scaleType: 'labels'
      },
      left: {
        mapsTo: 'value',
        title: 'Tipo',
        scaleType: 'labels'
      }
    },
    height: '350px',
    width:'100%'
  };
  dataSpike: any = [];
  optionsRadar: any = {
    toolbar: {
      enabled: false,
    },
    radar: {
      axes: {
        angle: 'feature',
        value: 'score',
      },
    },
    data: {
      groupMapsTo: 'product',
    },
    height: '25vh',
    width: '100%',
  };
  dataRadarPain: any = [
    {
      product : "Sentimientos",
      feature : "Dolor generalizado",
      score : 0
    }, {
      product : "Sentimientos",
      feature : "Dolor de cabeza",
      score : 0
    },  {
      product : "Sentimientos",
      feature : "Dolor pélvico",
      score : 0
     },  {
      product : "Sentimientos",
      feature : "Hinchazón abdominal",
      score : 0
    },  {
      product : "Sentimientos",
      feature : " Cólicos menstruales",
      score : 0
    },  {
      product : "Sentimientos",
      feature : "Sensibilidad en mamas",
      score : 0
    },  {
      product : "Sentimientos",
      feature : "Dolor lumbar",
      score : 0
    },
  ];
  dataRadarEmotion: any = [
    {
      product : "Sentimientos",
      feature : "Cambios de humor",
      score : 0
    },
    {
      product : "Sentimientos",
      feature : "Ansiedad",
      score : 0
    },
    {
      product : "Sentimientos",
      feature : "Depresión",
      score : 0
    },
    {
      product : "Sentimientos",
      feature : "Fatiga",
      score : 0
    },
    {
      product : "Sentimientos",
      feature : "Irritabilidad",
      score : 0
    },
    {
      product : "Sentimientos",
      feature : "Estrés",
      score : 0
    },
  ];
  loading: boolean = true;
  panelOpenState:boolean = true;
  constructor(
    private dataService: DataService,
    private _snackBar: MatSnackBar
  , private notificationDataService : NotificationDataService) {}

  ngOnInit():void {
  
    const today = new Date();
    today.setHours(today.getHours() - 6);
    this.setFormValues(today.toISOString().split('T')[0]);
    const notEnoughData = false;
    this.getChartsData();
    this.dataService.getAveragePeriod().subscribe(
      (data:any) =>{
        console.log("periodaverage", data);
      }
  );

  this.dataService.getNextPeriodDate().subscribe(
      (data:any) =>{
        console.log(data);
      }
  );
  this.dataService.getAverageVariationCycle().subscribe(
      (data:any) =>{
        console.log("variationCycle",data);
      }
  );
  this.dataService.getFertileDays().subscribe(
      (data:any) =>{
        console.log("fertileDays",data);
      })
    }

  getChartsData() {
    this.loading = true;
     this.dataService.getPeriodCritiriaLastMonth().subscribe((response: any) => {
      console.log(response)
        for (let i = 0; i < response.length; i++) {
          let item = response[i];
          switch (item.fieldName) {
            case 'temperature':
              if(item.value){
               this.dataLineal.push({
                group: 'Temperatura (C°)',
                date: item.date.replace(/-/g, '/').toString(),
                value: parseInt(item.value),
              });
              }
              break;
            case 'fluidAmount':
              if(item.value){
              this.dataSpike.push({
                group: 'Flujo Cervical',
                key: item.date.replace(/-/g, '/').toString(),
                value: item.value,
              });   
              }
            break;
            case 'sexTimes':
             this.dataCircle = this.dataCircle.map((objeto:any) => {
                if (objeto.group == item.value) {
                  return { ...objeto, value: objeto.value + 1 };
                }
                return objeto;
              });
          break;
            case 'emotionType':
            /*
              this.dataRadarEmotion = this.dataRadarEmotion.map((objeto:any) => {   
                console.log(objeto.feature == item.value);
                if (objeto.feature == item.value) {
                  return { ...objeto, feature: objeto.feature + 1 };
                }
                return objeto;
              });
               */ 
               for (let i = 0; i < this.dataRadarEmotion.length; i++) {
                if (this.dataRadarEmotion[i].feature == item.value) {
                  this.dataRadarEmotion[i].score = this.dataRadarEmotion[i].score + 1;
                }
              }
            break;
            case 'painType':
              /*
                this.dataRadarEmotion = this.dataRadarEmotion.map((objeto:any) => {   
                  if (objeto.feature == item.value) {
                    return { ...objeto, feature: objeto.feature + 1 };
                  }
                  return objeto;
                });
                 */ 
                 for (let i = 0; i < this.dataRadarPain.length; i++) {
                  if (this.dataRadarPain[i].feature == item.value) {
                    this.dataRadarPain[i].score = this.dataRadarPain[i].score + 1;
                  }
                }
              break;
        }
       }
        this.loading = false;
      });
    }
  createDataArrayList() {
    //define date
    if(this.date == undefined) this.date = new Date();
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

    if(this.dataArrayList.length > 0){
      this.dataService.addPeriodCriteriaList(this.dataArrayList).subscribe(
          (data:any) => {
            this._snackBar.open(data.Message,undefined,{duration: 5 * 1000});
            this.dataArrayList = [];
            this.notificationDataService.getNotifications();
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

  closeForm() {
    this.openedForm = false;
  }

 

  send(): number { 
    if(!this.isDateBeforeToday(this.date)){
      this._snackBar.open("No se pueden enviar datos en días posteriores al actual",undefined,{duration: 5 * 1000});
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

  onDateChange(event: any): void {
    this.clearValues();
    if(event.target.value)this.setFormValues(event.target.value);
    
  }

  setFormValues(date: string) {
    this.dataService.getExistingData(date).subscribe((response: any) => {
      this.date = date;
      if (response.length > 0) {
        this.periodCycle = response.find(
          (field: DataObject) => field.fieldName == 'periodCycle'
        ).value;
        this.periodAmount = response.find(
          (field: DataObject) => field.fieldName == 'periodAmount'
        ).value;
        this.periodColor = response.find(
          (field: DataObject) => field.fieldName == 'periodColor'
        ).value;
        this.fluidAmount = response.find(
          (field: DataObject) => field.fieldName == 'fluidAmount'
        ).value;
        this.fluidColor = response.find(
          (field: DataObject) => field.fieldName == 'fluidColor'
        ).value;
        this.emotionalState = response.find(
          (field: DataObject) => field.fieldName == 'emotionalState'
        ).value;
        this.physicalState = response.find(
          (field: DataObject) => field.fieldName == 'physicalState'
        ).value;
        this.sleepHours = response.find(
          (field: DataObject) => field.fieldName == 'sleepHours'
        ).value;
        this.temperature = response.find(
          (field: DataObject) => field.fieldName == 'temperature'
        ).value;
        this.sexTimes = response.find(
          (field: DataObject) => field.fieldName == 'sexTimes'
        ).value;
        this.emotionType = response.find(
          (field: DataObject) => field.fieldName == 'emotionType'
        ).value;
        this.painType = response.find(
          (field: DataObject) => field.fieldName == 'painType'
        ).value;
      }
    });
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

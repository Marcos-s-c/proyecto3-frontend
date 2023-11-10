import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PeriodData } from 'src/app/interface/period-data';
import { DataService } from 'src/app/services/dataService.service';
import { DialogService } from 'src/app/services/dialog.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
export type DataObject = {
  fieldName: string;
  value: any;
  date: any;
};
@Component({
  selector: 'dialog-data',
  templateUrl: './dialog-data.component.html',
  styleUrls: ['./dialog-data.component.scss'],
  providers: [DatePipe],
})
export class DialogDataComponent implements OnInit {
  selectedData: PeriodData | null = null;
  periodDataForm?: FormGroup;

  isEditMode: boolean = false;
  dataArrayList: Array<DataObject> = [];
  constructor(
    private dialogService: DialogService,
    private fb: FormBuilder,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.dialogService.selectedData$.subscribe((data) => {
      this.selectedData = data;
      console.log('Data received in DialogDataComponent:', this.selectedData);
      this.initializeForm();
    });
  }

  initializeForm() {
    if (this.selectedData) {
      this.periodDataForm = this.fb.group({
        date: [this.selectedData.date],
        emotionType: [this.selectedData.emotionType],
        emotionalState: [this.selectedData.emotionalState],
        fluidAmount: [this.selectedData.fluidAmount],
        fluidColor: [this.selectedData.fluidColor],
        painType: [this.selectedData.painType],
        periodAmount: [this.selectedData.periodAmount],
        periodColor: [this.selectedData.periodColor],
        periodCycle: [this.selectedData.periodCycle],
        physicalState: [this.selectedData.physicalState],
        sexTimes: [this.selectedData.sexTimes],
        sleepHours: [this.selectedData.sleepHours],
        temperature: [this.selectedData.temperature],
      });
    }
  }

  enterEditMode() {
    this.isEditMode = true;
  }

  saveChanges() {
    if (this.periodDataForm && this.periodDataForm.valid) {
      // Crea una matriz para almacenar los datos

      if (this.periodDataForm.value.periodAmount) {
        this.dataArrayList.push({
          fieldName: 'periodAmount',
          value: this.periodDataForm.value.periodAmount,
          date: this.selectedData?.date,
        });
      }
      if (this.periodDataForm.value.periodColor) {
        this.dataArrayList.push({
          fieldName: 'periodColor',
          value: this.periodDataForm.value.periodColor,
          date: this.selectedData?.date,
        });
      }
      if (this.periodDataForm.value.fluidAmount) {
        this.dataArrayList.push({
          fieldName: 'fluidAmount',
          value: this.periodDataForm.value.fluidAmount,
          date: this.selectedData?.date,
        });
      }
      if (this.periodDataForm.value.fluidColor) {
        this.dataArrayList.push({
          fieldName: 'fluidColor',
          value: this.periodDataForm.value.fluidColor,
          date: this.selectedData?.date,
        });
      }
      if (this.periodDataForm.value.emotionalState) {
        this.dataArrayList.push({
          fieldName: 'emotionalState',
          value: this.periodDataForm.value.emotionalState,
          date: this.selectedData?.date,
        });
      }
      if (this.periodDataForm.value.physicalState) {
        this.dataArrayList.push({
          fieldName: 'physicalState',
          value: this.periodDataForm.value.physicalState,
          date: this.selectedData?.date,
        });
      }
      if (this.periodDataForm.value.sleepHours) {
        this.dataArrayList.push({
          fieldName: 'sleepHours',
          value: this.periodDataForm.value.sleepHours,
          date: this.selectedData?.date,
        });
      }
      if (this.periodDataForm.value.temperature) {
        this.dataArrayList.push({
          fieldName: 'temperature',
          value: this.periodDataForm.value.temperature,
          date: this.selectedData?.date,
        });
      }
      if (this.periodDataForm.value.sexTimes) {
        this.dataArrayList.push({
          fieldName: 'sexTimes',
          value: this.periodDataForm.value.sexTimes,
          date: this.selectedData?.date,
        });
      }
      if (this.periodDataForm.value.emotionType) {
        this.dataArrayList.push({
          fieldName: 'emotionType',
          value: this.periodDataForm.value.emotionType,
          date: this.selectedData?.date,
        });
      }
      if (this.periodDataForm.value.painType) {
        this.dataArrayList.push({
          fieldName: 'painType',
          value: this.periodDataForm.value.painType,
          date: this.selectedData?.date,
        });
      }
      if (this.periodDataForm.value.periodCycle) {
        this.dataArrayList.push({
          fieldName: 'periodCycle',
          value: this.periodDataForm.value.periodCycle,
          date: this.selectedData?.date,
        });
      }
      console.log(this.dataArrayList);
      this.dataService.addPeriodCriteriaList(this.dataArrayList).subscribe(
        (response) => {
          // Maneja la respuesta exitosa o realiza otras acciones necesarias
          console.log('Cambios guardados con éxito', response);

          // Actualiza selectedData con los nuevos valores
          // Actualiza selectedData con los nuevos valores
          if (this.selectedData) {
            if (this.periodDataForm?.value.periodAmount) {
              this.selectedData.periodAmount =
                this.periodDataForm.value.periodAmount;
            }
            if (this.periodDataForm?.value.periodColor) {
              this.selectedData.periodColor =
                this.periodDataForm.value.periodColor;
            }
            if (this.periodDataForm?.value.emotionType) {
              this.selectedData.emotionType =
                this.periodDataForm?.value.emotionType;
            }
            if (this.periodDataForm?.value.emotionalState) {
              this.selectedData.emotionalState =
                this.periodDataForm?.value.emotionalState;
            }
            if (this.periodDataForm?.value.fluidAmount) {
              this.selectedData.fluidAmount =
                this.periodDataForm?.value.fluidAmount;
            }
            if (this.periodDataForm?.value.fluidColor) {
              this.selectedData.fluidColor =
                this.periodDataForm?.value.fluidColor;
            }
            if (this.periodDataForm?.value.painType) {
              this.selectedData.painType = this.periodDataForm.value.painType;
            }
            if (this.periodDataForm?.value.periodAmount) {
              this.selectedData.periodAmount =
                this.periodDataForm?.value.periodAmount;
            }
            if (this.periodDataForm?.value.periodCycle) {
              this.selectedData.periodCycle =
                this.periodDataForm?.value.periodCycle;
            }
            if (this.periodDataForm?.value.physicalState) {
              this.selectedData.physicalState =
                this.periodDataForm.value.physicalState;
            }
            if (this.periodDataForm?.value.sexTimes) {
              this.selectedData.sexTimes = this.periodDataForm.value.sexTimes;
            }
            if (this.periodDataForm?.value.sleepHours) {
              this.selectedData.sleepHours =
                this.periodDataForm?.value.sleepHours;
            }
            if (this.periodDataForm?.value.temperature) {
              this.selectedData.temperature =
                this.periodDataForm?.value.temperature;
            }
          }

          // Muestra una alerta de éxito
          Swal.fire(
            'Éxito',
            'Los cambios se han guardado con éxito',
            'success'
          );

          // Desactiva el modo de edición
          this.isEditMode = false;
        },
        (error) => {
          // Maneja errores en la solicitud HTTP, si es necesario
          console.error('Error al guardar los cambios', error);

          // Muestra una alerta de error
          Swal.fire(
            'Error',
            'No se pudieron guardar los cambios. Inténtalo de nuevo.',
            'error'
          );
        }
      );
    }
  }

  // Función para actualizar todos los datos en el formulario de vista

  cancelEdit() {
    // Cancela la edición y vuelve al modo de visualización
    this.isEditMode = false;
    this.initializeForm(); // Restablece el formulario con los valores originales
  }

  closeDialog() {
 
    this.dialogService.closeDialog();
  }
}

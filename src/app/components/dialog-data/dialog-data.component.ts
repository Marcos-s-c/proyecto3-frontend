import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PeriodData } from 'src/app/interface/period-data';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'dialog-data',
  templateUrl: './dialog-data.component.html',
  styleUrls: ['./dialog-data.component.scss'],
})
export class DialogDataComponent implements OnInit {
  selectedData: PeriodData | null = null;
  periodDataForm?: FormGroup;

  isEditMode: boolean = false;

  constructor(private dialogService: DialogService, private fb: FormBuilder) {}

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
    // Guarda los cambios en la data y realiza la lógica necesaria
    // ...

    // Desactiva el modo de edición
    this.isEditMode = false;
  }

  cancelEdit() {
    // Cancela la edición y vuelve al modo de visualización
    this.isEditMode = false;
    this.initializeForm(); // Restablece el formulario con los valores originales
  }
}

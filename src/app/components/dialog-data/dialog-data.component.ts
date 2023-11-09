import { Component, Input, OnInit } from '@angular/core';
import { PeriodData } from 'src/app/interface/period-data';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'dialog-data',
  templateUrl: './dialog-data.component.html',
  styleUrls: ['./dialog-data.component.scss'],
})
export class DialogDataComponent implements OnInit {
  selectedData: PeriodData | null = null;

  constructor(private dialogService: DialogService) {}

  ngOnInit() {
    this.dialogService.selectedData$.subscribe((data) => {
      this.selectedData = data;
      console.log('Data received in DialogDataComponent:', this.selectedData);
    });
  }
}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { startOfDay } from 'date-fns';
import { CalendarView, CalendarEvent } from 'angular-calendar';
import { DataService } from 'src/app/services/dataService.service';
import { DialogService } from 'src/app/services/dialog.service';
import { parseISO } from 'date-fns';
import { PeriodData } from 'src/app/interface/period-data';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private dialogService: DialogService
  ) {}

  public periodCriteria = {
    date: '',
    fieldName: '',
    value: null,
  };

  groupedData: any[] = [];
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  events: CalendarEvent[] = [];

  ngOnInit() {
    this.getDataById().subscribe((data) => {
      this.groupedData = this.groupAndCombineFieldsByDate(data);
    });
  }

  getDataById() {
    return this.dataService.getExistingDataById();
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    const clickedDate = date.toISOString().split('T')[0];
    const selectedData = this.groupedData.find(
      (data) => data.date.toISOString().split('T')[0] === clickedDate
    );
    if (selectedData) {
      // Abre el diálogo utilizando tu servicio de diálogo
      this.dialogService.openDialog(selectedData);
    }
  }
  groupAndCombineFieldsByDate(data: any) {
    const grouped: Record<string, Record<string, any>> = {};

    // Agrupa los datos por fecha
    data.forEach((item: any) => {
      const { date, fieldName, value } = item;
      if (!grouped[date]) {
        grouped[date] = {
          date: date,
        };
      }

      grouped[date][fieldName] = value;
    });

    // Crea el objeto consolidado y ajusta las fechas al formato "día/mes/año"
    const consolidatedData = [];
    for (const date in grouped) {
      const consolidatedItem: Record<string, any> = {
        date: parseISO(date), // Ajusta la fecha al comienzo del día
      };
      for (const fieldName in grouped[date]) {
        if (fieldName !== 'date') {
          consolidatedItem[fieldName] = grouped[date][fieldName];
        }
      }
      consolidatedData.push(consolidatedItem);
      console.log(consolidatedItem);
    }

    // Transforma los datos consolidados en objetos CalendarEvent
    const calendarEvents: CalendarEvent[] = consolidatedData.map(
      (consolidatedItem: Record<string, any>) => {
        return {
          start: consolidatedItem['date'], // Utiliza la fecha ajustada
          title: consolidatedItem['date'], // Puedes personalizar el título como desees
        };
      }
    );

    // Asigna los eventos al arreglo events
    this.events = calendarEvents;

    return consolidatedData;
  }
}

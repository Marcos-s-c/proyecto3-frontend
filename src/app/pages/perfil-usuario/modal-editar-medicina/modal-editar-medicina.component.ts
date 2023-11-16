import {Component, Inject} from '@angular/core';
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

@Component({
  selector: 'app-modal-editar-medicina',
  templateUrl: 'modal-editar-medicina.component.html',
  styleUrls: ['./modal-editar-medicina.component.scss'],
})
export class ModalEditarMedicinaComponent {

  public medicine_id: number;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any) {
    this.medicine_id = data.medicine_id;
  }

}


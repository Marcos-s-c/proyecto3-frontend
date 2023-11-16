import { Component } from '@angular/core';
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {ComponentType} from "@angular/cdk/overlay";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-modal-editar-medicina',
  templateUrl: 'modal-editar-medicina.component.html',
  styleUrls: ['./modal-editar-medicina.component.scss']
})
export class ModalEditarMedicinaComponent {
  constructor(public dialog: MatDialog) {
  }



  openDialog(): void {
    this.dialog.open(DialogElementsExampleDialog);
  }

}

export class DialogElementsExample {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialogmodal.html',
})
export class DialogElementsExampleDialog {}

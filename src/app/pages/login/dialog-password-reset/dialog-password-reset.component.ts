import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-password-reset',
  templateUrl: './dialog-password-reset.component.html',
  styleUrls: ['./dialog-password-reset.component.scss'],
})
export class DialogPasswordResetComponent implements OnInit {
  dialogEmail = {
    email: '',
  };

  constructor(
    private snack: MatSnackBar,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  formSubmit() {
    if (
      this.dialogEmail.email.trim() == '' ||
      this.dialogEmail.email.trim() == null
    ) {
      this.snack.open('El email es requerido!', 'Aceptar', {
        duration: 3000,
      });
      return;
    } else {
      this.snack.open('El email fue enviado con éxito!', 'Aceptar', {
        duration: 3000,
      });
    }

    // Expresión regular para validar correos electrónicos
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    if (!emailRegex.test(this.dialogEmail.email)) {
      this.snack.open(
        'El email no es válido. Ingresa un correo válido.',
        'Aceptar',
        {
          duration: 3000,
        }
      );
      return;
    }

    this.userService
      .reiniciarContraseña(this.dialogEmail)
      .subscribe((data: any) => {
        this.snack.open('Se ha enviado un código a tú correo.', 'Aceptar', {
          duration: 3000,
        });
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; // Importa MatDialog

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent implements OnInit {
  passwordReset = {
    newPassword: '',
    repeatPassword: '',
    userCode: '',
  };

  constructor(
    private snack: MatSnackBar,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog // Inyecta MatDialog
  ) {}

  ngOnInit(): void {
    //  parámetro 'userCode' en el método 'ngOnInit'
    this.route.params.subscribe((params) => {
      this.passwordReset.userCode = params['userCode'];
    });
  }

  formSubmit() {
    console.log(this.passwordReset.newPassword)
    console.log(this.passwordReset.repeatPassword)
    if (!this.passwordReset.newPassword) {
      this.snack.open('La nueva contraseña es requerida!', 'Aceptar', {
        duration: 3000,
      });
      return;
    }
    if (!this.passwordReset.repeatPassword) {
      this.snack.open('Debe repetir la nueva contraseña!', 'Aceptar', {
        duration: 3000,
      });
      return;
    }

    if (
      this.passwordReset.newPassword.trim() != 
      this.passwordReset.repeatPassword.trim() 
    ) {
      this.snack.open('Las contraseñas son distintas', 'Aceptar', {
        duration: 3000,
      });
      return;
    }

    this.userService.changePassword(this.passwordReset).subscribe(
      (response) => {
        Swal.fire({
          title: 'Cambio de contraseña',
          text: 'Su contraseña ha sido cambiada exitosamente!',
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: 'pink',
        }).then((result) => {
          if (result.isConfirmed) {
            this.dialog.closeAll();
            this.router.navigate(['/']);
          }
        });
      },
      (error) => {
        //manejar los errores de manera más efectiva
        if (error.status === 500) {
          Swal.fire({
            title: 'Error del servidor',
            text: 'Ha ocurrido un error en el servidor. Por favor, inténtalo más tarde.',
            icon: 'error',
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: 'pink',
          }).then((result) => {
            if (result.isConfirmed) {
              this.dialog.closeAll();
              this.router.navigate(['/']);
            }
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Ha ocurrido un error. Por favor, inténtalo de nuevo.',
            icon: 'error',
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: 'pink',
          }).then((result) => {
            if (result.isConfirmed) {
              this.dialog.closeAll();
              this.router.navigate(['/']);
            }
          });
        }
      }
    );
  }
}

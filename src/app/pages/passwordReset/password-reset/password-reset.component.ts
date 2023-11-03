import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent implements OnInit {
  passwordReset = {
    newPassword: '',
    userCode: '',
  };

  constructor(
    private snack: MatSnackBar,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Acceder al parámetro 'userCode' en el método 'ngOnInit'
    this.route.params.subscribe((params) => {
      this.passwordReset.userCode = params['userCode'];
    });
  }

  formSubmit() {
    if (
      this.passwordReset.newPassword.trim() == '' ||
      this.passwordReset.newPassword.trim() == null
    ) {
      this.snack.open('La nueva contraseña es requerida!', 'Aceptar', {
        duration: 3000,
      });
      return;
    }

    console.log(this.passwordReset);
    // Ahora puedes usar this.passwordReset.code en tu llamada al servicio
    this.userService
      .changePassword(this.passwordReset)
      .subscribe((data: any) => {
        console.log(data);
        // this.snack.open('Se ha enviado un código a tu correo.', 'Aceptar', {
        //   duration: 3000,
        // });
      });
  }
}

import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginData = {
    email: '',
    password: '',
  };

  constructor(
    private snack: MatSnackBar,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  formSubmit() {
    if (
      this.loginData.email.trim() == '' ||
      this.loginData.email.trim() == null
    ) {
      this.snack.open('El email es requerido!', 'Aceptar', {
        duration: 3000,
      });
      return;
    }

    // Expresión regular para validar correos electrónicos
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    if (!emailRegex.test(this.loginData.email)) {
      this.snack.open(
        'El email no es válido. Ingresa un correo válido.',
        'Aceptar',
        {
          duration: 3000,
        }
      );
      return;
    }
    if (
      this.loginData.password.trim() == '' ||
      this.loginData.password.trim() == null
    ) {
      this.snack.open('La contraseña es requerida!', 'Aceptar', {
        duration: 3000,
      });
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        this.loginService.loginUser(data.token);
        this.loginService.setUser(data.user);
        console.log(this.loginService.getUserRole());

        if (this.loginService.getUserRole() == 'ADMIN') {
          //dashboard admin
          //window.location.href = '/admin';
          this.router.navigate(['admin']);
          this.loginService.loginStatusSubjec.next(true);
        } else if (this.loginService.getUserRole() == 'ROLE_USER') {
          this.router.navigate(['/']);
          this.loginService.loginStatusSubjec.next(true);
        } else {
          this.loginService.logout();
        }
      },
      (error) => {
        console.log(error);
        this.snack.open('Detalles inválidos!', 'Aceptar', {
          duration: 3000,
        });
      }
    );
  }
}

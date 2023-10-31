import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public user = {
    name: '',
    surname: '',
    email: '',
    password: '',
    phone: '',
  };

  constructor(
    private userService: UserService,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  formSubmit() {
    console.log(this.user);

    if (
      !this.user.name ||
      !this.user.surname ||
      !this.user.email ||
      !this.user.phone ||
      !this.user.password
    ) {
      this.snack.open(
        'Todos los campos del formulario son obligatorios.',
        'Aceptar',
        {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        }
      );
      return;
    }

    this.userService.añadirUsuario(this.user).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Usuario guardado', 'Usuario registrado con exito.');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
        this.snack.open('Ha ocurrido un error en el sistema !!', 'Aceptar', {
          duration: 3000,
        });
      }
    );
  }
}

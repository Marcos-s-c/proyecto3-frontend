import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaskService } from 'src/app/services/mask.service';
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
    private router: Router,
    public maskService: MaskService
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
        }
      );
      return;
    }

    // Expresión regular para validar correos electrónicos
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    if (!emailRegex.test(this.user.email)) {
      this.snack.open(
        'El email no es válido. Ingresa un correo válido.',
        'Aceptar',
        {
          duration: 3000,
        }
      );
      return;
    }
  this.maskService.isLoading = true;
    this.userService.añadirUsuario(this.user).subscribe(
      (response) => {
        console.log(response);
        this.maskService.isLoading = false;
        Swal.fire({
          title: 'Usuario guardado',
          text: 'Usuario registrado con éxito.',
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: 'pink',
        }).then((result) => {
          if (result.isConfirmed) {
            // El usuario hizo clic en "Aceptar"
          }
        });

        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
        if (error.status === 400) {
          // Error de credenciales incorrectos (Código de respuesta 400)
          this.snack.open(
            'Este correo ya esta en uso, por favor utilice otro',
            'Aceptar',
            {
              duration: 3000,
            }
          );
          this.maskService.isLoading = false;
        } else {
          // Error del sistema u otro tipo de error
          this.snack.open('Ha ocurrido un error en el sistema.', 'Aceptar', {
            duration: 3000,
          });
          this.maskService.isLoading = false;
        }
      }
    );
  }
}

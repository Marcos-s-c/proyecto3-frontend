import {Component, Input, OnInit} from '@angular/core';
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {Router, RouterModule} from "@angular/router";
import {UserService} from "../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import Swal from "sweetalert2";

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss'],
  standalone: true,
  imports: [MatTabsModule, MatIconModule, MatInputModule, FormsModule, MatButtonModule, ReactiveFormsModule, RouterModule],
})
export class PerfilUsuarioComponent implements OnInit {

  public user = {
    name: '',
    surname: '',
    email: '',
    password: '',
    phone: '',
  };

  constructor(    private userService: UserService,
                  private snack: MatSnackBar,
                  private router: Router) { }

  ngOnInit(): void {
  }

  editar(){

  }

  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  resetPassword() {

    if (this.newPassword === this.confirmPassword) {


    } else {


    }
  }

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

    this.userService.añadirUsuario(this.user).subscribe(
      (response) => {
        console.log(response);

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
        } else {
          // Error del sistema u otro tipo de error
          this.snack.open('Ha ocurrido un error en el sistema.', 'Aceptar', {
            duration: 3000,
          });
        }
      }
    );
  }

}

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
import {ThemePalette} from "@angular/material/core";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { CommonModule } from '@angular/common';
import {MatSelectModule} from "@angular/material/select";
import {LoginService} from "../../services/login.service";

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

export interface Medicamento{
  nombre: string;
  administracion: string;
  dosis: string;
  frecuencia: string;
}

export interface User{
  name: string,
  surname: string,
  email: string,
  password: string,
  phone: string,
}

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss'],
  standalone: true,
  imports: [MatTabsModule, MatIconModule, MatInputModule, FormsModule, MatButtonModule, ReactiveFormsModule, RouterModule, MatCheckboxModule, CommonModule, MatSelectModule],
})
export class PerfilUsuarioComponent implements OnInit {

  public editar:boolean = false;

  public user = {
    name: '',
    surname: '',
    email: '',
    password: '',
    phone: '',
  };

  private user1 = this.loginService.getUser();

  constructor(    private userService: UserService,
                  private loginService: LoginService,
                  private snack: MatSnackBar,
                  private router: Router) { }

  ngOnInit(): void {
    console.log(this.loginService.getUser())
    this.user.name = this.user1.name;
    this.user.surname = "No esta implementado en backend";
    this.user.surname = "No esta implementado en backend";
    this.user.email = this.user1.email;
    this.user.password = '*************';
    this.user.phone = this.user1.phone;
  }

  onEditar(clickEvent: any) {
    this.editar = true;
    clickEvent.stopPropagation();
  }

  onSalvarCambios(clickEvent: any) {
    // Handle the "Salvar Cambios" button click
    //clickEvent.stopPropagation();
  }

  onCancelar(clickEvent: any) {
    this.editar = false;
    clickEvent.stopPropagation();
  }


  //DATOS DE USUARIO


  //REESTABLECER CONTRASENA

  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  resetPassword() {

    if (this.newPassword === this.confirmPassword) {


    } else {


    }
  }

  formSubmit() {
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

    this.userService.actualizarUsuraio(this.user).subscribe(
      (response) => {
        console.log(response);

        Swal.fire({
          title: 'Usuario actualizado',
          text: 'Usuario actualizado con éxito.',
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: 'pink',
        }).then((result) => {
          if (result.isConfirmed) {
            // El usuario hizo clic en "Aceptar"
          }
        });
        },
      (error) => {
        console.log("Error actualizar",error);
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

  // PREFERENCIAS

  task: Task = {
    name: 'Seleccionar todas',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Mensaje de texto SMS', completed: false, color: 'primary'},
      {name: 'Mensaje de Whatsapp', completed: false, color: 'primary'},
      {name: 'Correo electrónico', completed: false, color: 'primary'},
    ],
  };

  allComplete: boolean = false;

  /*
  * updateAllComplete() es un método que calcula el valor de allComplete en función del estado de finalización de las subtareas:
    Comprueba si la propiedad de subtareas del objeto de tarea no es nula.
    Si las subtareas no son nulas, utiliza el método every para verificar si todas las subtareas tienen su propiedad completada establecida en true. Si lo hacen, establece this.allComplete en true;sino en false.*/
  updateAllComplete(){
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(task => task.completed);
  }

  someComplete(): boolean{
    if(this.task.subtasks == null){
      return false
    }
    return this.task.subtasks.filter(task => task.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean){
    this.allComplete = completed;
    if(this.task.subtasks == null){
      return;
    }
    this.task.subtasks.forEach((task => (task.completed = completed)))
  }

  ////MEDICAMENTOS
  medicamentos: Medicamento[] = [
    {nombre: "krokodile", administracion:"inyeccion", dosis:"1ml", frecuencia:"2 veces por dia"},
    {nombre: "Aspirina", administracion: "Tableta", dosis: "3mg", frecuencia: "1 vez al dia"} ,
    {nombre: "Amoxicilina", administracion: "Líquido", dosis: "10ml", frecuencia: "1 vez al dia"},
    {nombre: "krokodile", administracion:"inyeccion", dosis:"3ml", frecuencia:"1 vez a la semana"},
    {nombre: "Loratadina", administracion: "Tableta", dosis: "3mg", frecuencia: "2 veces por dia"}
  ]

  medicamentoSeleccionado: string = "";
  dosis: string = ""
  frecuancia: string = "";

  printToConsole(event:any){
    console.log(event.target.value)
  }
  onSeleccionMedicamento(event: any){

  }

  salvarMedicamento(){}

}

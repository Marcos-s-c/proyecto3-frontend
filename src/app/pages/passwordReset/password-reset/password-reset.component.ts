import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  passwordReset={
    "newPassword":'',
    "repeatPassword":''
  }
  
  constructor(private snack:MatSnackBar,private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit(){
    if(this.passwordReset.newPassword.trim() == '' || this.passwordReset.newPassword.trim() == null){
      this.snack.open('La nueva contraseña es requerida','Aceptar',{
        duration:3000
      })
      return;
    }

    if(this.passwordReset.repeatPassword.trim() == '' || this.passwordReset.repeatPassword.trim() == null){
      this.snack.open('Debe digitar nuevamente la contraseña','Aceptar',{
        duration:3000
      })
      return;
    }

  }

}

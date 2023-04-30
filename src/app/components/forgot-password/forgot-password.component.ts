import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{

  formForgotPass: FormGroup;

  constructor(private userService: UserService, private router: Router){
    this.formForgotPass=new FormGroup({
      email:new FormControl()
    })
  }


  ngOnInit(): void{

  }

  onSubmit(){
    this.userService.resetPassword(this.formForgotPass.value)
    .then(response=>{
      console.log(response);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Se envió satisfactoriamente la solicitud de cambio de contraseña a su correo electrónico.',
        confirmButtonColor: '#a8549c',
        confirmButtonText: 'Aceptar'
      })
      this.router.navigate(['/login'])
    })
    .catch(e=>{
      console.log(e);
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'Por favor ingrese un correo electrónico válido.',
        confirmButtonColor: '#a8549c',
        confirmButtonText: 'Aceptar'
      })
    });
  }

}



import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  passwordFieldType = 'password';

  formLogin: FormGroup;

  constructor(private userService: UserService, private router: Router){
    this.formLogin=new FormGroup({
      email:new FormControl(),
      password:new FormControl()
    })
  }

  ngOnInit(): void{

  }

  onSubmit(){
      this.userService.login(this.formLogin.value)
      .then(response=>{
        console.log(response);
        this.router.navigate(['/home'])
      })
      .catch(e=>{
        console.log(e);
        Swal.fire({
          icon: 'warning',
          title: 'Warning',
          text: 'Error al iniciar sesión.',
          confirmButtonColor: '#a8549c',
          confirmButtonText: 'Aceptar'
        })
      });
  }

  togglePasswordVisibility(input: any): void {
    input.type = input.type === 'password' ? 'text' : 'password';
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}

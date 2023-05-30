import { Component, OnInit  } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { HttpDataService } from 'src/app/services/http-data.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  passwordFieldType: string = 'password';

  formReg: FormGroup;

  constructor(private userService: UserService, private router: Router, private  httpDataService: HttpDataService){
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit(): void {
    
  }

  onSubmit(){
    this.userService.register(this.formReg.value)
    .then(response=>{
      console.log(response);
      this.router.navigate(['/register/information']);
      this.httpDataService.guardarUsuarioEnAPI().subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.error(error);
        }
      );
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Se creó satisfactoriamente la cuenta.',
        confirmButtonColor: '#a8549c',
        confirmButtonText: 'Aceptar'
      })
    })
    .catch(e=>{
      console.log(e);
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'Ups...! Algo salio mal, por favor verifique que todos los campos esten rellenados.',
        confirmButtonColor: '#a8549c',
        confirmButtonText: 'Aceptar'
      })
    });
  }

  /* guardarUsuarioEnAPI() {
    this.httpDataService.guardarUsuarioEnAPI().subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error(error);
      }
    );
  } */

  togglePasswordVisibility(input: any): void {
    input.type = input.type === 'password' ? 'text' : 'password';
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

 
}


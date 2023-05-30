import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-register-information',
  templateUrl: './register-information.component.html',
  styleUrls: ['./register-information.component.css']
})
export class RegisterInformationComponent implements OnInit{
  
  
  datos: User={
    uid: null,
    email: null,
    id: null,
    name: null,
    age: null,
    city: null,
    country: null,
    url_photo: null,
    birthday: null,
    type_identification: null,
    number_identification: null
  }

  constructor(private auth: UserService, private router: Router){
    
  }

  ngOnInit(): void {
    
  }

  async submitUser(){
  console.log(this.datos);
   const res = await this.auth.register(this.datos).catch( error => {console.log(error)});
   if(res){
    //se creo el usuario correctamente
    const path = 'Users'
    const idUser = res.user.uid;
    const emailUser = res.user.email;
    this.datos.uid=idUser;
    this.datos.email=emailUser;
   } 
  }

  /* submitUserInfo(): void {
    if (this.formRegInfo.valid) {
      this.userService!.getCurrentUser().subscribe(user => {
        if (user) {
          this.httpDataService.agregarUsuarioInformacionEnAPI(this.formRegInfo).subscribe(
            (res: any) => {
              console.log(res);
              Swal.fire({
                title: 'Información guardada exitosamente',
                icon: 'success',
                confirmButtonText: 'Ok'
              }).then(() => {
                this.router.navigate(['/home']);
              });
            },
            (err: any) => {
              console.error(err);
              Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al guardar la información',
                icon: 'error',
                confirmButtonText: 'Ok'
              });
            }
          );
        }
      });
    }
  } */
  
}

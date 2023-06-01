import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user.model';
import { UserDataService } from 'src/app/services/user-data.service';
import { UserService } from 'src/app/services/user.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-information',
  templateUrl: './register-information.component.html',
  styleUrls: ['./register-information.component.css']
})
export class RegisterInformationComponent implements OnInit{
  
  
  data: User={
    uid: null,
    email: null,
    id: null,
    name: null,
    age: null,
    city: null,
    country: 'Perú',
    urlPhoto: null,
    birthday: null,
    typeIdentification: null,
    numberIdentification: null
  }

  constructor(private userService: UserService, private router: Router, private userDataService: UserDataService){
    
  }

  ngOnInit(): void {
    this.data.email = this.userService.getUserEmail();
    this.data.id = this.userService.getUserUid();
    this.data.uid = this.userService.getUserUid();

  }

  private getUserDataByID(userId: any){
    this.userDataService.getUserById(userId).subscribe(
      (data: User) => { // Asegúrate de especificar el tipo de datos esperado (User)
        console.log(data);
        this.data = data; // Asigna el resultado al objeto this.data
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }

  async submitUser(){
    try {
      await this.getUserDataByID(this.data.id);
      console.log(this.data);
  
      this.userDataService.createUser(this.data).subscribe(
        (response) => {
          console.log('Usuario creado:', response);
    
          // Navegar a la página de información del usuario
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Error al crear el usuario:', error);
        }
      );
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
    }
  }

  // Variables y metodos para el formulario de la url para la foto de perfil
  showCard = false;
  url_photo!: string;

  openCard() {
    this.showCard = true;
  }

  closeCard() {
    this.showCard = false;
  }

  savePhoto() {
    console.log(this.data.urlPhoto);
    this.closeCard();
  
    // Promesa para simular una llamada asíncrona   
    const fakeAsyncRequest = new Promise<void>((resolve, reject) => {
      if (this.data.urlPhoto) {
        setTimeout(() => {
          resolve();
        }, 1000); 
      } else {
        reject(new Error('Debes ingresar una URL de foto válida.'));

      }
    });
  
    fakeAsyncRequest
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Se cargo la url de la foto correctamente.',
          confirmButtonColor: '#a8549c',
          confirmButtonText: 'Aceptar'
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'warning',
          title: 'Warning',
          text: 'Error al cargar foto.',
          confirmButtonColor: '#a8549c',
          confirmButtonText: 'Aceptar'
        });
      });
  }
  
 
  
}

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
    url_photo: null,
    birthday: null,
    type_identification: null,
    number_identification: null
  }

  constructor(private userService: UserService, private router: Router, private userDataService: UserDataService){
    
  }

  ngOnInit(): void {
  
    this.data.email = this.userService.getUserEmail();
    this.data.uid = this.userService.getUserUid();
  }

  private getUserDataByID(){
    this.userDataService.getUserById().subscribe(data=>{
      this.data=data;
    })
  }

  async submitUser(){
  this.getUserDataByID();
  console.log(this.data);
   this.router.navigate(['/register/information']);
  }

 
  
}

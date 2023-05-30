import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserDataService } from 'src/app/services/user-data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.css']
})
export class HomeMainComponent {

  dataUser: User={
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

  constructor(private userService: UserService, private router:Router, private userDataService: UserDataService){}

  ngOnInit(): void{
    this.getUserDataByID();
    this.dataUser.email = this.userService.getUserEmail();
    this.dataUser.uid = this.userService.getUserUid();
  }

  onClick(){
    this.userService.logout()
    .then(()=>{
        this.router.navigate(['/login']);
    })
    .catch(e=>console.log(e))
  }

  private getUserDataByID(){
    this.userDataService.getUserById().subscribe(data=>{
      this.dataUser=data;
    })
  }

}

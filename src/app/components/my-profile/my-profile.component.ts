import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpDataService } from 'src/app/services/http-data.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {
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
  };

  constructor(private userService: UserService, private userDataService: UserDataService) {}

  ngOnInit(): void {
    this.getUserDataByID();
  
    this.dataUser.email = this.userService.getUserEmail();
    this.dataUser.uid = this.userService.getUserUid();
  }

  private getUserDataByID(){
    this.userDataService.getUserById().subscribe(data=>{
      this.dataUser=data;
    })
  }
  
}

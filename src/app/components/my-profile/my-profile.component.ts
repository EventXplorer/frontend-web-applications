import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
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
    urlPhoto: null,
    birthday: null,
    typeIdentification: null,
    numberIdentification: null
  };

  constructor(private userService: UserService, private userDataService:UserDataService) {}

  ngOnInit(): void {
    this.getUserDataByID(this.dataUser.uid);
  
    this.dataUser.email = this.userService.getUserEmail();
    this.dataUser.uid = this.userService.getUserUid();
  }

  private getUserDataByID(userId: any){
     this.userDataService.getUserById(userId).subscribe(data=>{
      this.dataUser=data;
    }) 
  }
  
}

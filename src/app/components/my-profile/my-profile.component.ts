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
    numberIdentification: null, 
    creditCard: null
  };

  constructor(private userService: UserService, private userDataService:UserDataService) {}

  ngOnInit(): void {
    this.dataUser.id = this.userService.getUserUid();
    this.dataUser.email = this.userService.getUserEmail();
    this.dataUser.uid = this.userService.getUserUid();

    const currentUser = this.userService.getCurrentUser();
    if (currentUser) {
      this.dataUser = currentUser;
      this.getUserDataByID(currentUser.uid);
    } 
  }

  private getUserDataByID(userId: any){
     this.userDataService.getUserById(userId).subscribe(data=>{
      this.dataUser=data;
    }) 
  }
  
}

import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpDataService } from 'src/app/services/http-data.service';
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
    name: 'Farid',
    age: 20,
    city: 'Lima',
    country: 'Perú',
    url_photo: 'dksamdkasm',
    birthday: '2003-02-15',
    type_identification: 'dni',
    number_identification: 73045603
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.dataUser.email = this.userService.getUserEmail();
    this.dataUser.uid = this.userService.getUserUid();
  }
  
}

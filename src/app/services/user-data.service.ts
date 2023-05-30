import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  //Url que retorna toda la lista de user del backend
  private baseUrl = "http://localhost:8080/user"; 

  constructor(private httpClient: HttpClient, private userService:UserService) { }

  //Metodo que retorna la lista de user del backend
  getUserById():Observable<User>{
    return this.httpClient.get<User>(`${this.baseUrl}/${this.userService.getUserId()}`);
  }

  
}

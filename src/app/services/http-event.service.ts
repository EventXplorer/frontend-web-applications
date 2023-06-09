import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class HttpEventService {
  //Url que retorna toda la lista de events del backend
  private baseUrl = "https://eventxplorer-backend.azurewebsites.net/event"; 

  constructor(private httpClient: HttpClient) { }

  createEvent(event: Event): Observable<any> {
    const url = `${this.baseUrl}`;
    return this.httpClient.post(url, event);
  }

  getEvent(index:any){
      return this.httpClient.get<any>(`${this.baseUrl}/${index}`);
  }
  //
  getAllEvents(){
    return this.httpClient.get<any[]>(`${this.baseUrl}`);
  }
  getEventsByUser(userId: any){
    return this.httpClient.get<any[]>(`${this.baseUrl}/user/${userId}`);
  }
}

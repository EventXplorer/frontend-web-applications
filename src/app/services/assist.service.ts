import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AssistService {

  private baseUrl = "https://eventxplorer-backend.azurewebsites.net/assist";

  constructor(private httpClient: HttpClient) { }


  createAssist(assist: any): Observable<any> {
    const url = `${this.baseUrl}`;
    return this.httpClient.post(url, assist);
  }
  getAllAssists(){
    return this.httpClient.get<any[]>(`${this.baseUrl}`);
  }
  getAssistsByEvent(eventId: any){
    return this.httpClient.get<any[]>(`${this.baseUrl}/event/${eventId}`);
  }

}

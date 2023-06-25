import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HttpEventService } from 'src/app/services/http-event.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-published-event',
  templateUrl: './published-event.component.html',
  styleUrls: ['./published-event.component.css']
})
export class PublishedEventComponent {
  displayedColumns: string[] = ['url_photo', 'title', 'address', 'date' , 'category'];
  data: any[] = [];
  dataSource = new MatTableDataSource<any>(this.data);
  events=[];
//
  
  user:User={
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
    creditcard: null
  };
  
  @ViewChild(MatPaginator, {static:true}) paginator!: MatPaginator;

  searchCategory: string = '';
  dataCategory: any[] = [];

  constructor(
    private eventService: HttpEventService,
    private router: Router,private UserService: UserService,private userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    this.getEvents()
    //
    this.getCreatedEvents();
  }
  //
  getCreatedEvents() {
    // Obtener todos los usuarios
    this.userDataService.getAllUsers().subscribe(
      (users: User[]) => {
        // Obtener todos los usuarios
        const allUsers = users;
  
        // Obtener los eventos de todos los usuarios
        const eventRequests = allUsers.map((user) =>
          this.eventService.getEventsByUser(user.id)
        );
  
        // Realizar las solicitudes de eventos en paralelo
        forkJoin(eventRequests).subscribe(
          (responses: any[]) => {
              const eventData:any[]=[];
  
            // Procesar las respuestas de eventos para cada usuario
            responses.forEach((events:any[], index) => {
              const currentUser = allUsers[index];
              const userEventData = events.map((event:any) => ({
                urlPhoto: event.urlPhoto,
                title: event.title,
                endTime: event.endTime,
                startTime: event.startTime,
                address: event.address,
              }));
  
              // Agregar los eventos al arreglo de datos
                eventData.push(...userEventData);
            
            });
          },
          (error) => {
            console.error(error);
          }
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
//
  getEvents(){
    let eventData;
    for(let i = 1; i<=10; i++)
    {
      this.eventService.getEvent(i).subscribe
      (
        res => {
          eventData = {
            url_photo: res.urlPhoto,
            title: res.title,
            date: res.date,
            address: res.address,
            category: res.category.name,

          }
          
          this.data.push(eventData)
          this.dataSource=new MatTableDataSource<any>(this.data);
          this.dataSource.paginator = this.paginator;
        },
        err=>{
          console.log(err);
        }
      );
    }

  }

  
  applyFilter() {
    this.dataSource.filter = this.searchCategory.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HttpEventService } from 'src/app/services/http-event.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { UserService } from 'src/app/services/user.service';
import { forkJoin } from 'rxjs';
import { Observable } from 'rxjs';
import { AssistService } from 'src/app/services/assist.service';



@Component({
  selector: 'app-published-event',
  templateUrl: './published-event.component.html',
  styleUrls: ['./published-event.component.css']
})
export class PublishedEventComponent {
  displayedColumns: string[] = ['url_photo', 'title', 'address', 'date' , 'category'];
  data: any[] = [];
  dataSource = new MatTableDataSource<any>(this.data);
  events: any[]= [];
//
  

  @ViewChild(MatPaginator, {static:true}) paginator!: MatPaginator;

  searchCategory: string = '';
  dataCategory: any[] = [];

  constructor(
    private eventService: HttpEventService,
    private router: Router,private UserService: UserService,private userDataService: UserDataService,
    private assistService: AssistService
  ) {}

  ngOnInit(): void {
    this.getEvents()
    //
    this.getCreatedEvents();
  }
  //
  getCreatedEvents() {

    this.eventService.getAllEvents().subscribe(
      res => {
        this.events = res; // Asigna la respuesta de eventos al arreglo this.events
  
        const requests: Observable<any>[] = this.events.map(event =>
          this.userDataService.getUserById(event.user.id)
        );
  
        forkJoin(requests).subscribe(
          (users: any[]) => {
            this.data = this.events.map((event, index) => ({
              url_photo: users[index].urlPhoto,
              urlphoto: event.urlPhoto,
              title: event.title,
              date: event.date,
              address: event.address,
              category: event.category.name,
              username: users[index].name,
            }));
  
           
          },
          err => {
            console.log(err);
          }
        );
      },
      err => {
        console.log(err);
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
  //
  attendEvent(event: any) {
    const userId= this.UserService.getUserUid();

    const currentDate= new Date();
    const confirmedDate= currentDate.toLocaleDateString();
    const confirmedTime= currentDate.toLocaleTimeString();

    const assist = {
      user: {id:userId},
      event: {id:event.id},
      confirmedDate: confirmedDate,
      confirmedTime: confirmedTime,
    };
    this.assistService.createAssist(assist).subscribe(  
      res => {
        console.log('Asistencia creada:', res);
      },
      err => {
        console.error('Error al crear la asistencia:', err);
      }
    );
}

  
  applyFilter() {
    this.dataSource.filter = this.searchCategory.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

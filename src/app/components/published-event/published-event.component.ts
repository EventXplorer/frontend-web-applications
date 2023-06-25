import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HttpEventService } from 'src/app/services/http-event.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { UserService } from 'src/app/services/user.service';


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
  allEvent:any[]=[];
  
  @ViewChild(MatPaginator, {static:true}) paginator!: MatPaginator;

  searchCategory: string = '';
  dataCategory: any[] = [];

  constructor(
    private eventService: HttpEventService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getEvents()
    //
    this.getCreatedEvents();
  }
  //
  getCreatedEvents(){
    this.eventService.getAllEvents().subscribe(
      (response:any[])=>{
        this.allEvent=response;
      },
      (error)=>{
        console.error(error);
      }
    );
  }

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

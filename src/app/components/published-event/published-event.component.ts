import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HttpEventService } from 'src/app/services/http-event.service';


@Component({
  selector: 'app-published-event',
  templateUrl: './published-event.component.html',
  styleUrls: ['./published-event.component.css']
})
export class PublishedEventComponent {
  displayedColumns: string[] = ['name', 'photo', 'organizator', 'city', 'category', 'date', 'actions'];
  data: any[] = [];
  dataSource = new MatTableDataSource<any>(this.data);
  events=[];
  @ViewChild(MatPaginator, {static:true}) paginator!: MatPaginator;

  

  constructor(
    private eventService: HttpEventService,
    private router: Router,
  ) {}

  getEvents(){
    let eventData;
    for(let i = 1; i<=10; i++)
    {
      this.eventService.getEvent(i).subscribe
      (
        res => {
          eventData = {
            name: res.name,
            date: res.date,

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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getNameByCategory(row: any){
    //Example
    //this.router.navigateByUrl(`/detail/${row.position}`);
  }

}

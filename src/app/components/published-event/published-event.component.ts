import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-published-event',
  templateUrl: './published-event.component.html',
  styleUrls: ['./published-event.component.css']
})
export class PublishedEventComponent {
  displayedColumns: string[] = ['name', 'photo', 'organizator', 'city', 'category', 'date', 'actions'];
  data: any[] = [];
  dataSource = new MatTableDataSource<any>(this.data);

  @ViewChild(MatPaginator, {static:true}) paginator!: MatPaginator;

  events=[];

  constructor() {}

  getNameByCategory(row: any){
    //Example
    //this.router.navigateByUrl(`/detail/${row.position}`);
  }

}

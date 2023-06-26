import { Component } from '@angular/core';
import { HttpEventService } from 'src/app/services/http-event.service';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-pe-event-progress',
  templateUrl: './pe-event-progress.component.html',
  styleUrls: ['./pe-event-progress.component.css']
})
export class PeEventProgressComponent {



  datae: Event = {
    id: null,
    urlPhoto: null,
    title:null,
    date: null,
    startTime: null,
    endTime:null,
    capacity:null,
    amount: null,
    address:null,
    city:null,
    district: null,
    user:{
      id: '',
    },
    category:{
      id: null,
    },
  }

  constructor(
    private eventService: HttpEventService,
    ) 
    {}



  ngOnInit(): void {
    this.getEventDataByID(this.eventService.getAllEvents.length);
  }


  private getEventDataByID(eventId: any){
    this.eventService.getEvent(eventId).subscribe(data=>{
      this.datae=data;
    })
  }


}

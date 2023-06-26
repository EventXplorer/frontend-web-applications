import { Component } from '@angular/core';
import { HttpEventService } from 'src/app/services/http-event.service';
import { Event } from 'src/app/models/event.model';
import { UserDataService } from 'src/app/services/user-data.service';


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
    private eventService: HttpEventService, userService: UserDataService
    ) 
    {    }



  ngOnInit(): void {
    
    //Pasar el ultimo id de evento
    this.eventService.getAllEvents().subscribe(events => {
      const lastEvent = events.reduce((prev, current) => (prev.id > current.id ? prev : current));
      this.getEventDataByID(lastEvent.id);
    });
    
  }


  private getEventDataByID(eventId: any){
    this.eventService.getEvent(eventId).subscribe(data=>{
      this.datae=data;
      console.log(this.datae);
    })

  }


}

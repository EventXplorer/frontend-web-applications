import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserDataService } from 'src/app/services/user-data.service';
import { UserService } from 'src/app/services/user.service';
import { Event } from 'src/app/models/event.model';
import { HttpEventService } from 'src/app/services/http-event.service';


export interface lastEvents {
  photo: any;
  title:any;
  
}

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.css']
})


export class HomeMainComponent {

  recentEvents: lastEvents[] = [];

  dataUser: User={
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
  }
  p1: lastEvents ={ photo: null, title: null,}
  p4: lastEvents ={ photo: null, title: null,}
  p3: lastEvents ={ photo: null, title: null,}
  p2: lastEvents ={ photo: null, title: null,}



  

  constructor(private userService: UserService, 
    private router:Router, 
    private userDataService: UserDataService,
    private eventService: HttpEventService,
    ){}

  ngOnInit(): void{
    this.dataUser.email = this.userService.getUserEmail();
    this.dataUser.uid = this.userService.getUserUid();

    const currentUser = this.userService.getCurrentUser();
    if (currentUser) {
      this.dataUser = currentUser;
      this.getUserDataByID(currentUser.uid);
    } 

      //Pasar el ultimo id de evento
    /*this.eventService.getAllEvents().subscribe(events => {
      const lastEvent = events.reduce((prev, current) => (prev.id > current.id ? prev : current));
      for (let i = 0; i < 4; i++) {
        this.getEventDataByID((lastEvent.id)-i, i);
        console.log(this.getEventDataByID((lastEvent.id)-i, i));
      }
    });*/

    this.eventService.getAllEvents().subscribe(events => {
      const sortedEvents = events.sort((a, b) => b.id - a.id);
      const recentEvents = sortedEvents.slice(0, 4);
      this.recentEvents = recentEvents.map(event => ({
        photo: event.urlPhoto,
        title: event.title
      }));
    });
    
  }


  private getEventDataByID(eventId: any, index: any) {
    this.eventService.getEvent(eventId).subscribe(data => {
      const event: lastEvents = { photo: data.urlPhoto, title: data.title };
  
      if (index === 0) {
        this.p1 = event;
      } else if (index === 1) {
        this.p2 = event;
      } else if (index === 2) {
        this.p3 = event;
      } else if (index === 3) {
        this.p4 = event;
      }
    });
  }
  

  onClick(){
    this.userService.logout()
    .then(()=>{
        this.router.navigate(['/login']);
    })
    .catch(e=>console.log(e))
  }

  private getUserDataByID(userId: any){
    this.userDataService.getUserById(userId).subscribe(data=>{
      this.dataUser=data;
    })
  }

}

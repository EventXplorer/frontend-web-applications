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
    this.eventService.getAllEvents().subscribe(events => {
      const lastEvent = events.reduce((prev, current) => (prev.id > current.id ? prev : current));
      for (let i = 0; i < 4; i++) {
        this.getEventDataByID((lastEvent.id)-1, i);
      }
    });
    
  }


  private getEventDataByID(eventId: any, index: any){
    this.eventService.getEvent(eventId).subscribe(data=>{
      if(index==1){this.p1.photo=data.urlPhoto; this.p1.title=data.title}else{
      if(index==2){this.p2.photo=data.urlPhoto; this.p2.title=data.title}else{
      if(index==3){this.p3.photo=data.urlPhoto; this.p3.title=data.title}else{
      if(index==4){this.p4.photo=data.urlPhoto; this.p4.title=data.title}}}}
      
    })

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

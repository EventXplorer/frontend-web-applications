import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Event } from 'src/app/models/event.model';
import { UserDataService } from 'src/app/services/user-data.service';
import { UserService } from 'src/app/services/user.service';
import { HttpEventService } from 'src/app/services/http-event.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


interface Option {
  value: string;
  viewValue: string;
}
interface Option2 {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-pe-make-event',
  templateUrl: './pe-make-event.component.html',
  styleUrls: ['./pe-make-event.component.css']
})
export class PeMakeEventComponent implements OnInit{
  selectedOption: string ='Option1';
  options: Option[] = [
    {value: 'option-1', viewValue: 'Social Events'},
    {value: 'option-2', viewValue: 'Sports Events'},
    {value: 'option-3', viewValue: 'Academic Events'},
    {value: 'option-4', viewValue:'Party Events'}

  ];
  selectedOption2: string ='Option1';
  options2:Option2[]=[
    {value: 'option-1', viewValue: 'Lima'},
    {value: 'option-2', viewValue: 'Arequipa'},
    {value: 'option-3', viewValue: 'Trujillo'},
    {value: 'option-4', viewValue:'Chiclayo'},
    {value: 'option-5', viewValue:'Cusco'},
    {value: 'option-6', viewValue:'Iquitos'},
  ];

  datae: Event = {
    id: null,
    url_photo: null,
    title:null,
    date: null,
    start_time: null,
    end_time:null,
    capacity:null,
    amount: 12,
    address:null,
    city:null,
    district: null,
    user:{
      id: "dsadas",
    }

  }
  constructor(
    private userService: UserService, 
    private router: Router, 
    private userDataService: UserDataService,
    private eventService: HttpEventService,
    )
    {
    
  }

  ngOnInit(): void {
    //this.datae.user = this.userService.getUserUid();
    
  }

  async createdEvent(){
    try {
      console.log(this.datae);
      this.eventService.createUser(this.datae).subscribe(
        (response)=>{
          console.log('Event created!', response);
          this.router.navigate(['/payment-details']);
        },
        (error) => {
          this.router.navigate(['/publish-event']);
        }
      );
    } catch(error){

    }
  }
  
}

import { Component, OnInit, AfterViewInit, ViewChild, ElementRef  } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Event } from 'src/app/models/event.model';
import { UserDataService } from 'src/app/services/user-data.service';
import { UserService } from 'src/app/services/user.service';
import { HttpEventService } from 'src/app/services/http-event.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Category } from 'src/app/models/category.model';

interface Option {
  value: string;
  viewValue: string;
}
interface Option2 {
  value: string;
  viewValue: string;
}

declare const google: any;

@Component({
  selector: 'app-pe-make-event',
  templateUrl: './pe-make-event.component.html',
  styleUrls: ['./pe-make-event.component.css']
})
export class PeMakeEventComponent implements OnInit{
  @ViewChild('inputPlaces') inputPlaces!: ElementRef;
  @ViewChild('inputCities') inputCities!: ElementRef;
  addressAutocomplete: any;
  cityAutocomplete: any;
  dataCategory: any;


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
    private userService: UserService, 
    private router: Router, 
    private userDataService: UserDataService,
    private eventService: HttpEventService,
    private http: HttpClient
    )
    {
    
  }

  ngOnInit(): void {
    this.datae.user.id = this.userService.getUserUid();
    
    this.http.get('https://eventxplorer-backend.azurewebsites.net/category').subscribe((response) => {
      this.dataCategory = response;
      console.log(this.dataCategory); // Mostrar los datos en la consola para verificar
    });
  }

  ngAfterViewInit() {
     //obtener direcciones
     this.addressAutocomplete = new google.maps.places.Autocomplete(this.inputPlaces.nativeElement, {
      componentRestrictions: { country: 'pe' } // Filtrar por Perú
    });
    this.addressAutocomplete.setFields(['address_components', 'geometry']);
    //obtener ciudades
    this.cityAutocomplete = new google.maps.places.Autocomplete(this.inputCities.nativeElement, {
      types: ['(cities)'],
      componentRestrictions: { country: 'pe' } // Filtrar por Perú
    });
    this.cityAutocomplete.setFields(['address_components', 'geometry']);
 
  }

  async createdEvent(){
   
    try {
      console.log(this.datae);
      
      const category:Category = this.dataCategory.find((c:Category) => c.id === this.datae.category.id);
      this.datae.category= category;
      //Post Event
      const response= await this.http.post('https://eventxplorer-backend.azurewebsites.net/event',this.datae).toPromise();

      console.log('The payment was successful.', response);

      this.router.navigate(['/publish-event/payment-details']);
    } catch (error) {
      this.router.navigate(['/publish-event/payment-details']);
    }
    //hallar monto segun hora de inicio y fin multiplicado con la capacidad
    this.findAmount();

    console.log(this.datae);
  }

  
  findAmount() {
    if (this.datae.startTime && this.datae.endTime) {
      const startTimeParts = this.datae.startTime.split(':');
      const endTimeParts = this.datae.endTime.split(':');
  
      const startHours = parseInt(startTimeParts[0], 10);
      const startMinutes = parseInt(startTimeParts[1], 10);
      const endHours = parseInt(endTimeParts[0], 10);
      const endMinutes = parseInt(endTimeParts[1], 10);
  
      if (!isNaN(startHours) && !isNaN(startMinutes) && !isNaN(endHours) && !isNaN(endMinutes)) {
        const startTime = new Date();
        startTime.setHours(startHours);
        startTime.setMinutes(startMinutes);
  
        const endTime = new Date();
        endTime.setHours(endHours);
        endTime.setMinutes(endMinutes);
  
        const capacity = Number(this.datae.capacity);
  
        if (!isNaN(capacity)) {
          this.datae.amount = capacity * (endTime.getTime() - startTime.getTime()) / (1000 * 60); // Cálculo del tiempo en minutos
        }
      }
    }
  }

  
}

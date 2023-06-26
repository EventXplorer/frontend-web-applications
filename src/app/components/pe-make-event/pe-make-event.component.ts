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
import Swal from 'sweetalert2';

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

  mapUrl:String='';

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
    this.addressAutocomplete.setFields(['formatted_address',]); //obtener direcciones completas
    //guardar la dirección en el modelo
    this.addressAutocomplete.addListener('place_changed', () => {
      const place = this.addressAutocomplete.getPlace();
      const addressComponents = place.address_components;
      let address = '';

      for (const component of addressComponents) {
        if (component.types.includes('street_number')) {
          address += component.long_name + ' ';
        }
        if (component.types.includes('route')) {
       address += component.long_name;
        }
  }

  this.datae.address = address;
      //Lat and long
      const latitude = place.geometry.location.lat();
      const longitude = place.geometry.location.lng();

      this.datae.address = address; 
      this.mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`; 
      
      console.log('URL del mapa:', this.mapUrl);
    });
    
    //obtener ciudades
    this.cityAutocomplete = new google.maps.places.Autocomplete(this.inputCities.nativeElement, {
      types: ['(cities)'],
      componentRestrictions: { country: 'pe' } // Filtrar por Perú
    });
    this.cityAutocomplete.setFields(['formatted_address']);
    //guardar la ciudad en el modelo
    this.cityAutocomplete.addListener('place_changed', () => {
      const place = this.cityAutocomplete.getPlace();
      const city = place.formatted_address;
      this.datae.city = city;
    });
 
  }

  async createdEvent(){
    if (this.validateForm()) {

      try {
        console.log(this.datae);
        
        const category:Category = this.dataCategory.find((c:Category) => c.id === this.datae.category.id);
        this.datae.category= category;

        this.findAmount();

        //Post Event
        const response= await this.http.post('https://eventxplorer-backend.azurewebsites.net/event',this.datae).toPromise();

        console.log('The payment was successful.', response);

        this.router.navigate(['/publish-event/payment-details']);
      } catch (error) {
        this.router.navigate(['/publish-event/payment-details']);
      }
      
      this.findAmount();

      console.log(this.datae);
    }
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

  validateForm(): boolean {
   
    if (!this.datae.urlPhoto || !this.datae.category.id || !this.datae.title || !this.datae.date || !this.datae.startTime || !this.datae.endTime || !this.datae.capacity || !this.datae.address || !this.datae.city || !this.datae.district) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Form',
        text: 'Please fill in all the required fields.',
        confirmButtonColor: '#a8549c',
        confirmButtonText: 'OK'
      });
      return false; 
    }
    return true; 
  }
}

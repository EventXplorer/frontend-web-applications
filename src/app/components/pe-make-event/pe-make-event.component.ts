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
      id: '',
    },
    category:{
      id: null,
      name: '',
    }as Category,

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
    //agregar listener para obtener la dirección seleccionada
    // y almacenarla en la variable address
    this.addressAutocomplete.addListener('place_changed', () => {
      const place = this.addressAutocomplete.getPlace();
      
      this.datae.address = place.formatted_address;
    });
    //agregar listener para obtener la ciudad seleccionada
    // y almacenarla en la variable city
    this.cityAutocomplete.addListener('place_changed', () => {
      const place = this.cityAutocomplete.getPlace();

      this.datae.city = place.name;
    });
  }

  async createdEvent(){
  
    try {
      console.log(this.datae);
      const category = this.dataCategory.find((c:Category) => c.id === this.datae.category.id);
      this.datae.category= category;

      const response = await this.eventService.createEvent(this.datae).toPromise();
      console.log('The payment was successful.', response);
      this.router.navigate(['/publish-event/payment-completed']);
    } catch (error) {
      this.router.navigate(['/publish-event/payment-completed']);
    }
  }
  
}

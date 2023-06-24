import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

declare const google: any;

@Component({
  selector: 'app-pe-make-event',
  templateUrl: './pe-make-event.component.html',
  styleUrls: ['./pe-make-event.component.css']
})
export class PeMakeEventComponent implements AfterViewInit {
  @ViewChild('inputPlaces') inputPlaces!: ElementRef;
  @ViewChild('inputCities') inputCities!: ElementRef;
  addressAutocomplete: any;
  cityAutocomplete: any;

  ngAfterViewInit() {
    this.addressAutocomplete = new google.maps.places.Autocomplete(this.inputPlaces.nativeElement, {
      componentRestrictions: { country: 'pe' } // Filtrar por Perú
    });
    this.addressAutocomplete.setFields(['address_components', 'geometry']);

    this.cityAutocomplete = new google.maps.places.Autocomplete(this.inputCities.nativeElement, {
      types: ['(cities)'],
      componentRestrictions: { country: 'pe' } // Filtrar por Perú
    });
    this.cityAutocomplete.setFields(['address_components', 'geometry']);

    this.addressAutocomplete.addListener('place_changed', () => {
      const place = this.addressAutocomplete.getPlace();
      console.log(place);
    });

    this.cityAutocomplete.addListener('place_changed', () => {
      const place = this.cityAutocomplete.getPlace();
      console.log(place);
    });
  }
}

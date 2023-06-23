import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

declare const google: any;

@Component({
  selector: 'app-pe-make-event',
  templateUrl: './pe-make-event.component.html',
  styleUrls: ['./pe-make-event.component.css']
})
export class PeMakeEventComponent implements AfterViewInit {
  @ViewChild('inputPlaces') inputPlaces!: ElementRef;
  autocomplete: any;

  ngAfterViewInit() {
    this.autocomplete = new google.maps.places.Autocomplete(this.inputPlaces.nativeElement);
    this.autocomplete.setFields(['address_components', 'geometry']);

    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete.getPlace();
      console.log(place);
    });
  }
}

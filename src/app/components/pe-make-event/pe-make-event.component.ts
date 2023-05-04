import { Component } from '@angular/core';

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
export class PeMakeEventComponent {
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
}

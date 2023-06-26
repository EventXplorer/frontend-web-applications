import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Payment } from 'src/app/models/payment.model';
import { PaymentService } from 'src/app/services/payment.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { UserService } from 'src/app/services/user.service';
import { HttpEventService } from 'src/app/services/http-event.service';
import { Event } from 'src/app/models/event.model';
import { User } from 'src/app/models/user.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-pe-paymentdetails',
  templateUrl: './pe-paymentdetails.component.html',
  styleUrls: ['./pe-paymentdetails.component.css']
})
export class PePaymentdetailsComponent {
  isChecked=false;
  showPaymentForm = false;

  openPaymentForm() {
    this.showPaymentForm = true;
  }
  closePaymentForm() {
    this.showPaymentForm = false;
  }
  
  dataPayment: Payment={
    id: undefined,
    amount: null,
    date: undefined,
    status_payment: true,
    user: {
      id: '',
    },
  };

  user: any;

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
    private paymentService: PaymentService, private userService: UserService, 
    private router:Router, 
    private userDataService:UserDataService,
    private eventService: HttpEventService,
    ) 
    {
    this.user = {
      creditcard: this.userService.getUserCreditCard(),
    };
    
    this.dataPayment = {
      id: undefined,
      amount: null,
      date: undefined,
      status_payment: true,
      user: {
        id: this.userService.getUserUid() || '',
      },
    };
  }
  
  ngOnInit(): void {

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
      this.getEventDataByID(lastEvent.id);
    });
    
  }


  private getEventDataByID(eventId: any){
    this.eventService.getEvent(eventId).subscribe(data=>{
      this.datae=data;
      console.log(this.datae);
    })

  }

  private getUserDataByID(userId: any){
    this.userDataService.getUserById(userId).subscribe(data=>{
      this.dataUser=data;
    })
  }

  async createPayment(){
    console.log(this.dataPayment.amount);
    console.log(this.datae.amount);


    if (!this.isChecked && this.dataPayment.amount === this.datae.amount) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'Please accept the terms and conditions.',
        confirmButtonColor: '#a8549c',
        confirmButtonText: 'Accept'
      });
      return;
    }

    try {
      const response = await this.paymentService.createPayment(this.dataPayment, this.dataPayment.user.id).toPromise();
      console.log('The payment was successful.', response);
      //this.router.navigate(['/publish-event/payment-completed']);
    } catch (error) {
      this.router.navigate(['/publish-event/payment-completed']);
    }
    this.closePaymentForm();
  }
  
  formatCreditCard(creditCard: string): string {
    if (!creditCard) {
      return '';
    }
    // Eliminar todos los caracteres no numéricos del número de tarjeta de crédito
    const numericCreditCard = creditCard.replace(/\D/g, '');
    // Aplicar el formato deseado (ejemplo: "**** **** **** 1234")
    const formattedCreditCard = numericCreditCard.replace(/(\d{4}(?=\d))/g, '$1 ');
    return formattedCreditCard;
  }


}
  
  


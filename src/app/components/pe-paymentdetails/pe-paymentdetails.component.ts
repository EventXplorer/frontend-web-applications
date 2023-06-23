import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Payment } from 'src/app/models/payment.model';
import { PaymentService } from 'src/app/services/payment.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { UserService } from 'src/app/services/user.service';
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
    id: null,
    amount: null,
    date: null,
    status_payment: false,
    user: {
      id: '',
    },
  };

  user: any;

  

  constructor(private paymentService: PaymentService, private userService: UserService, private router:Router, private userDataService:UserDataService) {
    this.user = {
      creditcard: this.userService.getUserCreditCard(),
    };
    
    this.dataPayment = {
      id: null,
      amount: null,
      date: null,
      status_payment: false,
      user: {
        id: this.userService.getUserUid() || '',
      },
    };

    console.log(this.userService.getUserUid());

  }
  
  ngOnInit(): void {

    }

  createPayment(){

    if (!this.isChecked) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'Please accept the terms and conditions.',
        confirmButtonColor: '#a8549c',
        confirmButtonText: 'Accept'
      });
      return;
    }

    // Crea una copia del objeto dataPayment
    const payment: Payment = { ...this.dataPayment };

    console.log(payment);

    this.paymentService.createPayment(payment, payment.user.id).subscribe(
      (response) => {
        console.log('The payment was successful.', response);
        this.router.navigate(['/payment-completed']);
      },
      (error) => {
        //console.error('Error creating payment:', error);
        this.router.navigate(['/payment-completed']);
        Swal.fire({
          icon: 'warning',
          title: 'Warning',
          text: 'Error when making the payment.',
          confirmButtonColor: '#a8549c',
          confirmButtonText: 'Aceptar'
        });
      }
    );
    
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
  
  


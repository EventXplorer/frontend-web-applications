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
    id: undefined,
    amount: null,
    date: undefined,
    status_payment: true,
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
      id: undefined,
      amount: null,
      date: undefined,
      status_payment: true,
      user: {
        id: this.userService.getUserUid() || '',
      },
    };
  }
  
  ngOnInit(): void {}

  async createPayment(){

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
  
  


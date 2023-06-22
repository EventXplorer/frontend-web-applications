import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Payment } from 'src/app/models/payment.model';
import { PaymentService } from 'src/app/services/payment.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { UserService } from 'src/app/services/user.service';

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
    status_payment: true,
    user_id: null
  };

  user: any;

  

  constructor(private paymentService: PaymentService, private userService: UserService, private router:Router, private userDataService:UserDataService) {
    this.dataPayment.user_id = this.userService.getUserUid();
    this.user = {
      numberIdentification: this.userService.getUserNumberIdentification()
    };
  }
  
  ngOnInit(): void {

    }

  createPayment(){
    this.paymentService.createPayment(this.dataPayment, this.dataPayment.user_id).subscribe(
      (response) => {
        console.log('Payment created successfully:', response);
        this.router.navigate(['/payment-completed']);
      },
      (error) => {
        console.error('Error creating payment:', error);
      }
    );
    this.closePaymentForm();
  }
}
  
  


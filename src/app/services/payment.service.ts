import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = 'https://eventxplorer-backend.azurewebsites.net'; 


  constructor(private http: HttpClient) { }

  createPayment(payment: Payment, userId: string): Observable<any> {
    const url = `${this.baseUrl}/user/${userId}/payment`;
    return this.http.post(url, payment);
  }

  getPaymentById(paymentId: number): Observable<Payment> {
    const url = `${this.baseUrl}/payment/${paymentId}`;
    return this.http.get<Payment>(url);
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterInformationComponent } from './components/register-information/register-information.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { canActivate, redirectUnauthorizedTo }  from '@angular/fire/auth-guard';
import { HomeMainComponent } from './components/home-main/home-main.component';
import { MyMessagesComponent } from './components/my-messages/my-messages.component';
import { SupportComponent } from './components/support/support.component';
import { PublishedEventComponent } from './components/published-event/published-event.component';
import { ResumeComponent } from './components/resume/resume.component';
import { PeMakeEventComponent } from './components/pe-make-event/pe-make-event.component';
import { PePaymentdetailsComponent } from './components/pe-paymentdetails/pe-paymentdetails.component';
import { PePaymentCompletedComponent } from './components/pe-payment-completed/pe-payment-completed.component';
import { PeEventProgressComponent } from './components/pe-event-progress/pe-event-progress.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  // {path: '**', pathMatch: 'full', redirectTo: 'home'},
  {path: 'login', component:LoginComponent},
  {path: 'mymessages', component:MyMessagesComponent},
  {path: 'support', component:SupportComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'register/information', component:RegisterInformationComponent},
  {path: 'forgotpassword', component:ForgotPasswordComponent},
  {path: 'home', component:HomeMainComponent,...canActivate(()=>redirectUnauthorizedTo(['/login']))},

  {path: 'publishedevent', component:PublishedEventComponent},
  {path: 'resume', component:ResumeComponent},
  {path: 'publish-event/make-event', component:PeMakeEventComponent},
  {path: 'publish-event/payment-details', component:PePaymentdetailsComponent},
  {path:'publish-event/payment-completed', component:PePaymentCompletedComponent},
  {path:'publish-event/event-progress', component:PeEventProgressComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterialModule } from 'shared/material.module'
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterInformationComponent } from './components/register-information/register-information.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { NavbarLoginComponent } from './components/navbar-login/navbar-login.component';
import { FooterLoginComponent } from './components/footer-login/footer-login.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';

import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeMainComponent } from './components/home-main/home-main.component';
import { SupportComponent } from './components/support/support.component';
import { ResumeComponent } from './components/resume/resume.component';
import { PublishedEventComponent } from './components/published-event/published-event.component';
import { PeMakeEventComponent } from './components/pe-make-event/pe-make-event.component';
import { PePaymentdetailsComponent } from './components/pe-paymentdetails/pe-paymentdetails.component';
import { PePaymentCompletedComponent } from './components/pe-payment-completed/pe-payment-completed.component';
import { PeEventProgressComponent } from './components/pe-event-progress/pe-event-progress.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { ReactiveFormsModule} from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RegisterInformationComponent,
    ForgotPasswordComponent,
    NavbarLoginComponent,
    FooterLoginComponent,
    FooterComponent,
    HeaderComponent,
    HomeMainComponent,
    SupportComponent,
    ResumeComponent,
    PublishedEventComponent,
    PeMakeEventComponent,
    PePaymentdetailsComponent,
    PePaymentCompletedComponent,
    PeEventProgressComponent,
    MyProfileComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    RouterModule,
    BrowserAnimationsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    ReactiveFormsModule,
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

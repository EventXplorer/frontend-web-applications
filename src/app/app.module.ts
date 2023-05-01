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
import { MyMessagesComponent } from './components/my-messages/my-messages.component';

import { ResumeComponent } from './components/resume/resume.component';
import { PublishedEventComponent } from './components/published-event/published-event.component';



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
    MyMessagesComponent,

    ResumeComponent,
    PublishedEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    RouterModule,
    BrowserAnimationsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

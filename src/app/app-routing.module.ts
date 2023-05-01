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

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  // {path: '**', pathMatch: 'full', redirectTo: 'home'},
  {path: 'login', component:LoginComponent},
  {path: 'mymessages', component:MyMessagesComponent},
  {path: 'support', component:SupportComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'register/information', component:RegisterInformationComponent},
  {path: 'forgotpassword', component:ForgotPasswordComponent},
  {path: 'home', component:HomeMainComponent,...canActivate(()=>redirectUnauthorizedTo(['/login']))}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

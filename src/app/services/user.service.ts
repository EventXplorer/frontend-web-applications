import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  data: User={
    uid: null,
    email: null,
    id: 1,
    name: null,
    age: null,
    city: null,
    country: 'Perú',
    url_photo: null,
    birthday: null,
    type_identification: null,
    number_identification: null
  }

  constructor(private auth: Auth) { }

  resetPassword({ email }: any){
    return  sendPasswordResetEmail(this.auth, email);
  }

  register({ email, password}: any){
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({ email, password}: any){
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout(){
    return signOut(this.auth);
  }

  getUserEmail(){
    return this.auth.currentUser?.email;
  }

  getUserUid(){
    return this.auth.currentUser?.uid;
  }

  getUserId(){
    return this.data.id;
  }
  
}

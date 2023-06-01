import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { User } from '../models/user.model';
import { UserDataService } from './user-data.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  data: User={
    uid: null,
    email: null,
    id: null,
    name: null,
    age: null,
    city: null,
    country: 'Perú',
    urlPhoto: null,
    birthday: null,
    typeIdentification: null,
    numberIdentification: null
  }

  constructor(private auth: Auth, private userDataService:UserDataService) { }

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

  getCurrentUser(): User | null {
    const currentUser = this.auth.currentUser;
    if (currentUser) {
      const { uid, email } = currentUser;
      return { uid, email, id: null, name: null, age: null, city: null, country: 'Perú', urlPhoto: null, birthday: null, typeIdentification: null, numberIdentification: null };
    }
    return null;
  }

}

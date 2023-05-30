import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';



@Injectable({
  providedIn: 'root'
})
export class UserService {

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
  
}

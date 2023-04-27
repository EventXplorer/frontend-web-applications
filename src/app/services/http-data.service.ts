import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { catchError, map, Observable, retry, throwError } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Inject } from '@angular/core';

import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HttpDataService {
  base_Url= "http://localhost:3000/users"

  constructor(private http: HttpClient,  @Inject(AngularFireAuth) private afAuth: AngularFireAuth) { }

  guardarUsuarioEnAPI(): Observable<any> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          const usuario = {
            uid: user.uid,
            email: user.email
          };
          return this.http.post<User>(this.base_Url, usuario);
        } else {
          return throwError("Usuario no autenticado");
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error.message || "Error al enviar los datos al servidor");
      })
    );
  }
  
}

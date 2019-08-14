import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // A URL da API
  apiUrl: string = "http://localhost:8000/api/";
  
  // As headers da requisição
  httpHeaders = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  }

  // Construtor
  constructor( public http: HttpClient ) {} 

  // Registro de usuário
  registrarUsuario (form): Observable<any> {
    console.log(form);
    return this.http.post(this.apiUrl + 'register', form, this.httpHeaders );
  }
  
  // Login de usuário
  logarUsuario (form): Observable<any> {
    return this.http.post(this.apiUrl + 'login', {
      'email': form.email,
      'password': form.password
    }, this.httpHeaders );
  }
  
  // Logout do usuário
  deslogarUsuario(): Observable<any> {
    this.httpHeaders.headers["Authorization"] = "Bearer " + localStorage.getItem('userToken');
    return this.http.get(this.apiUrl + 'logout', this.httpHeaders );
  }

  getInfoUsuario (): Observable<any> {
    this.httpHeaders.headers["Authorization"] = "Bearer " + localStorage.getItem('userToken');
    return this.http.get(this.apiUrl + 'getDetails', this.httpHeaders );
  }

  enviaEmail( forgotForm ) {
    return this.http.post(this.apiUrl + 'updatePassword', forgotForm, this.httpHeaders );
  }

}

import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//import { AuthService } from '../services/auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  loginForm: FormGroup;

  constructor( public formbuilder: FormBuilder, public router: Router ) { 
    this.loginForm = this.formbuilder.group({
  		email: ['', [Validators.required, Validators.email]],
  		senha: ['', [Validators.required]],
  	});
  }

  ngOnInit() {
  }

  logarUsuario( loginForm: FormGroup) {
    console.log(loginForm);
  }

}

import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  cadastroForm: FormGroup;

  constructor( public formbuilder: FormBuilder, public router: Router ) {

    this.cadastroForm = this.formbuilder.group({
  		nome: ['', [Validators.required, Validators.minLength(3)]],
  		email: ['', [Validators.required, Validators.email]],
  		senha: ['', [Validators.required, Validators.minLength(6)]],
      senhaConfirmacao: ['', [Validators.required, Validators.minLength(6)]],
  	});
  }

  ngOnInit() {
  }

  cadastrarUsuario( cadastroForm: FormGroup) {
    console.log(cadastroForm.value);
  }
}

import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  cadastroForm: FormGroup;

  constructor( public formbuilder: FormBuilder, public authService: AuthService,  public router: Router,
    public toastController: ToastController ) {

    this.cadastroForm = this.formbuilder.group({
  		name: ['', [Validators.required, Validators.minLength(3)]],
  		email: ['', [Validators.required, Validators.email]],
  		password: ['', [Validators.required, Validators.minLength(6)]],
      c_password: ['', [Validators.required, Validators.minLength(6)]]
  	});
  }

  ngOnInit() {
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Usuário criado com sucesso!',
      duration: 2000
    });
    toast.present();
  }

  registrarUsuario( cadastroForm: FormGroup) {
    
    if ( cadastroForm.status == "VALID") {
      //console.log(cadastroForm.value);

      this.authService.registrarUsuario( cadastroForm.value ).subscribe(
        ( res ) => {
          //console.log( res );
          localStorage.setItem('userToken', res.success.token);
          this.presentToast();
          this.router.navigate(['home']);
        }
      );
    }
  }
}

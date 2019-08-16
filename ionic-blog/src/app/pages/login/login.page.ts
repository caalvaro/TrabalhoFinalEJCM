import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastController, NavController } from '@ionic/angular';

import { AuthService } from '../../service/auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  loginForm: FormGroup;

  constructor( public formbuilder: FormBuilder, public authService: AuthService,  public router: Router,
    public toastController: ToastController, public navController:NavController ) { 
    this.loginForm = this.formbuilder.group({
  		email: ['', [Validators.required, Validators.email]],
  		password: ['', [Validators.required, Validators.minLength(6)]],
  	});
  }

  ngOnInit() {
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Email ou senha não correspondem.',
      duration: 2000
    });
    toast.present();
  }

  logarUsuario( loginForm: FormGroup ) {
    if ( loginForm.status == "VALID" ) {
      this.authService.logarUsuario(loginForm.value).subscribe(
        ( res ) => {
          //console.log(res);
          localStorage.setItem('userToken', res.success.token);
          this.router.navigate(['tabs/home']);
        },
        ( err ) => {
          this.presentToast();
        }
      );
    }
  }

  public goBack() {
    this.navController.pop();
  }

}

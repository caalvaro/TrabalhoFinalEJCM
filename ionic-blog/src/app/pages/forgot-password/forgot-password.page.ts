import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastController } from '@ionic/angular';

import { AuthService } from '../../service/auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  forgotForm: FormGroup;

  constructor( public formbuilder: FormBuilder, public authService: AuthService,  public router: Router,
    public toastController: ToastController ) { 
    this.forgotForm = this.formbuilder.group({
  		email: ['', [Validators.required, Validators.email]]
  	});
  }

  ngOnInit() {
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Um email foi enviado para você!',
      duration: 2000
    });
    toast.present();
  }

  enviaEmail( forgotForm ) {
    if ( forgotForm.status == "VALID" ) {
      this.authService.enviaEmail(forgotForm.value).subscribe(
        (res) => {
          this.presentToast();
          this.router.navigate(['login']);
        }
      );
    }
  }

}

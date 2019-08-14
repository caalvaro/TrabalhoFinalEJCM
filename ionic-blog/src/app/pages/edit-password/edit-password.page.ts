import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.page.html',
  styleUrls: ['./edit-password.page.scss'],
})
export class EditPasswordPage implements OnInit {

  senhaForm: FormGroup;

  constructor( public formbuilder: FormBuilder, public authService: AuthService,  public router: Router,
    public toastController: ToastController ) {
      this.senhaForm = this.formbuilder.group({
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
      message: 'Senha alterada com sucesso',
      duration: 2000
    });
    toast.present();
  }

  mudarSenha( senhaForm ){
    if ( senhaForm.status == "VALID") {

      this.authService.mudarSenha( senhaForm.value ).subscribe(
        ( res ) => {
          console.log( res );
          this.presentToast();
          this.router.navigate(['tabs/home']);
        }
      );
    }
  }

}

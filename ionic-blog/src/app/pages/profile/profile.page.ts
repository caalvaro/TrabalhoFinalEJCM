import { Component } from '@angular/core';

import { AuthService } from '../../service/auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  infoUsuario: any;
  
  constructor(public router: Router, public authService: AuthService) { 
    this.resetUser();
  }

  ionViewWillEnter () {
    if (localStorage.getItem('userToken') != null) {
      this.getInfoUsuario();
    }
  }

  deslogarUsuario() {
    this.authService.deslogarUsuario().subscribe(
      (res) => {
        console.log(res);
        localStorage.removeItem('userToken');
        this.router.navigate(['tabs/home']);
        this.resetUser();
      }
    );
  }

  getInfoUsuario() {
    this.authService.getInfoUsuario().subscribe(
      (res) => {
        this.infoUsuario = res.success;
        if (res.success.photo == null) {
          this.infoUsuario.photo = '..\\..\\..\\assets\\default_image\\user.jpg';
        }
        // console.log(this.infoUsuario);
      }
    );
  }

  resetUser() {
    this.infoUsuario = {'email': "user@name.com",
                            'id': -1,
                            'isBlogger': 0,
                            'name': "Username",
                            'photo': '..\\..\\..\\assets\\default_image\\user.jpg'};
  }

}

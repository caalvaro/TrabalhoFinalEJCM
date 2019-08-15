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
    this.infoUsuario = {'email': "user@name.com",
    'id': -1,
    'isBlogger': 0,
    'name': "Username",
    'photo': '..\\..\\..\\assets\\icon\\user.png'};
  }

  ionViewWillEnter () {
    console.log("entrou aaaaaaa");
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
        this.infoUsuario = {'email': "user@name.com",
                            'id': -1,
                            'isBlogger': 0,
                            'name': "Username",
                            'photo': '..\\..\\..\\assets\\icon\\user.png'};
      }
    );
  }

  getInfoUsuario() {
    this.authService.getInfoUsuario().subscribe(
      (res) => {
        console.log(res);
        this.infoUsuario = res.success;
        if (res.success.photo == null) {
          this.infoUsuario.photo = '..\\..\\..\\assets\\icon\\user.png';
        }
        console.log(this.infoUsuario);
      }
    );
  }

}

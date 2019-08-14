import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service'

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  infoUsuario = {
    isBlogger: 0,
    photo: null
  }

  constructor(public authService: AuthService) {}

  ionViewDidEnter () {
    if (localStorage.getItem('userToken') != null) {
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
}

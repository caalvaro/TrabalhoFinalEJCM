import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../service/auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(public router: Router, public authService: AuthService) { }

  ngOnInit() {
  }

  deslogarUsuario() {
    this.authService.deslogarUsuario().subscribe(
      (res) => {
        console.log(res);
        localStorage.removeItem('userToken');
        this.router.navigate(['home']);
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';

import { ToastController } from '@ionic/angular';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { AuthService } from '../../service/auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage {

  form = {
    name: ''
  }
  myPhoto;

  constructor(  public authService: AuthService, public router: Router, public toastController: ToastController, private camera: Camera ) {
      
  }

  ionViewDidEnter () {
    if (localStorage.getItem('userToken') != null) {
      this.authService.getInfoUsuario().subscribe(
        (res) => {
          this.form.name = res.success.name;
          
          if (res.success.photo == null) {
            this.myPhoto = '..\\..\\..\\assets\\icon\\user.png';
          }
          else {
            this.myPhoto = res.success.photo;
          }
        }
      );
    }
  }

  openGallery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    };
 
    this.camera.getPicture(options).then(
      (imageData) => {
        this.myPhoto = 'data:image/jpeg;base64,' + imageData;
        this.form['photo'] = this.myPhoto;
        console.log('data:image/jpeg;base64,' + imageData);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { PostsService } from '../../service/posts.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  perfilForm: FormGroup;
  myPhoto;

  constructor( public formbuilder: FormBuilder, public postsService: PostsService, 
    public router: Router, public toastController: ToastController, private camera: Camera ) {
      this.perfilForm = this.formbuilder.group({
        nome: ['', [Validators.required, Validators.minLength(3)]],
        photo: ['ionic-blog\\src\\assets\\icon\\user.png', []]
      });
  }

  ngOnInit() {
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
        this.perfilForm.value.photo = this.myPhoto;
        console.log('data:image/jpeg;base64,' + imageData);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}

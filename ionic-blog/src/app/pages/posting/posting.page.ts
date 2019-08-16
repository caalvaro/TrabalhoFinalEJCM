import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, NavController } from '@ionic/angular';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { PostsService } from '../../service/posts.service';
import { AuthService } from 'src/app/service/auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-posting',
  templateUrl: './posting.page.html',
  styleUrls: ['./posting.page.scss'],
})
export class PostingPage implements OnInit {

  postForm: FormGroup;
  myPhoto;

  infoUsuario: any;

  constructor( public formbuilder: FormBuilder, public postsService: PostsService, 
    public router: Router, public toastController: ToastController, private camera: Camera, public authService: AuthService, public navController:NavController ) {
      this.postForm = this.formbuilder.group({
        content: ['', [Validators.required]],
        photo: ['', []]
      });
      this.infoUsuario = {'email': "user@name.com",
                          'id': -1,
                          'isBlogger': 0,
                          'name': "Username",
                          'photo': '..\\..\\..\\assets\\default_image\\user.jpg'};
  }

  ionViewWillEnter () {
    if (localStorage.getItem('userToken') != null) {
      this.authService.getInfoUsuario().subscribe(
        (res) => {
          this.infoUsuario = res.success;
          if (res.success.photo == null) {
            this.infoUsuario.photo = '..\\..\\..\\assets\\default_image\\user.jpg';
          }
          console.log(this.infoUsuario);
        }
      );
    }
  }

  ngOnInit() {
  }

  async presentToast(mensagem) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000
    });
    toast.present();
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
        this.postForm.value.photo = this.myPhoto;
        console.log('data:image/jpeg;base64,' + imageData);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  postar( postForm ) {

    if ( postForm.status == "VALID") {
      console.log(postForm.value);

      this.postsService.postPosts( postForm.value ).subscribe(
        ( res ) => {
          let mensagem: string = 'Erro';
          console.log( res );
          if ( res[0] == "Apenas Bloggers podem criar, editar e excluir posts") {
            mensagem = "ERRO! Apenas Bloggers podem criar, editar e excluir posts";
          }
          else {
            mensagem = "Post criado com sucesso!";
          }
          this.presentToast(mensagem);
          this.router.navigate(['tabs/home']);
        }
      );
    }

  }

  public goBack() {
    this.navController.pop();
  }

}

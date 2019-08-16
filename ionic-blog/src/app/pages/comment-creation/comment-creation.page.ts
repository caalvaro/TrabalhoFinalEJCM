import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommentService } from '../../service/comment.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-comment-creation',
  templateUrl: './comment-creation.page.html',
  styleUrls: ['./comment-creation.page.scss'],
})
export class CommentCreationPage implements OnInit {

  @Input() id;
  postForm: FormGroup;
  infoUsuario: any;

  constructor(
    private modalController: ModalController,
    private commentService: CommentService,
    public router: Router,
    public formBuilder: FormBuilder,
    public toastController: ToastController,
    public authService: AuthService
    ) {
      this.postForm = this.formBuilder.group({
        content: ['', [Validators.required]],
      });
      this.infoUsuario = {
      'email': 'user@name.com',
      'id': -1,
      'isBlogger': 0,
      'name': "Username",
      'photo': '..\\..\\..\\assets\\icon\\user.png'
    };
     }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (localStorage.getItem('userToken') != null) {
      this.authService.getInfoUsuario().subscribe(
        (res) => {
          this.infoUsuario = res.success;
          if (res.success.photo == null) {
            this.infoUsuario.photo = '..\\..\\..\\assets\\icon\\user.png';
          }
          console.log(this.infoUsuario);
        }
      );
    }
  }


  public postComment(form) {

    // comentar caso der ruim mudar para outra pagina
    if (form.status === 'VALID') {
      console.log(form.value);
      this.commentService.postComments(form.value, this.id).subscribe(
        (res) => {
          console.log(res);
          let mensagem: string = 'Erro';
          this.router.navigate(['/tabs/home']);
          console.log(res);
          if (res[0] === 'Apenas Bloggers podem criar, editar e excluir comments') {
            mensagem = 'ERRO! Apenas Bloggers podem criar, editar e excluir comments';
          } else {
            mensagem = 'comment criado com sucesso!';
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  close() {
    this.modalController.dismiss();
  }

  async presentToast(mensagem) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000
    });
    toast.present();

  }

}

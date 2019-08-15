import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommentCreationPage } from '../../pages/comment-creation/comment-creation.page';
import { PostsService } from '../../service/posts.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts-cards',
  templateUrl: './posts-cards.component.html',
  styleUrls: ['./posts-cards.component.scss'],
})
export class PostsCardsComponent implements OnInit {

  @Input() cardPost;

  post;
  idUser: number;
  idPost: number;
  image: string;
  userName: string;
  userTitle: string;
  text: string;

  name = 'User';
  defaultImage = '../../assets/default_image/post.jpg ';
  defaultUser = '../../assets/default_image/user.jpg ';
  postTitle = 'Titulo Default';
  mainText = 'loanosicnasnckansklcnaslckascascascasccascasca scsCAS ASC G ZSG DG DF TXHSRTHTRSHTRHSRTHBSRTHNSRTHSRTHasc';

  constructor(
    private modalControler: ModalController,
    private postService: PostsService,
    private router: Router
    ) {
      // conseguir pegar o id do card quando crio ele

      // this.idUser = this.cardPost.id_user;
      // this.idPost = this.cardPost.id_post;

      //console.log(this.cardPost);
     }

  ngOnInit() {

  }

  public getPost() {
    this.post = this.postService.getPost(this.cardPost.id).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );


  }

  async showModalComent() {
    const modal = await this.modalControler.create({
      component: CommentCreationPage
    });

    modal.present();
  }

  // trocar as informacoes de imagem para texto
  public change() {
    if (this.image) {
      return true;
    }
  }

  // funcao para redirecionar pagina que da mais info sobre o user
  public userInfo() {
   // this.router.navigate(['/user-info', {id_user: this.idUser}]);
  }

  // funcao faz eu ver opcaoes de edicao do post
  public edit() {
  }

  // post info
  public postInfo() {
    this.router.navigate(['/card-info', {
      id_user: this.idUser,
      mensage: 'chegou mensagem '
    }]);

  }

}

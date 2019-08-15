import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
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


  name = 'User';
  defaultImage = '../../assets/default_image/post.jpg ';
  defaultUser = '../../assets/default_image/user.jpg ';
  postTitle = 'Titulo Default';
  mainText = 'loanosicnasnckansklcnaslckascascascasccascasca scsCAS ASC G ZSG DG DF TXHSRTHTRSHTRHSRTHBSRTHNSRTHSRTHasc';

  constructor(
    private modalControler: ModalController,
    private postService: PostsService,
    private router: Router,
    private navCont: NavController
    ) {
      // conseguir pegar o id do card quando crio ele

      // this.idUser = this.cardPost.id_user;
      // this.idPost = this.cardPost.id_post;

      //console.log(this.cardPost);
     }

  ngOnInit() {
    console.log('mensagem')
    console.log(this.cardPost);
  }

 

  async showModalComent() {
    const modal = await this.modalControler.create({
      component: CommentCreationPage
    });

    modal.present();
  }

  // trocar as informacoes de imagem para texto
  public change() {
    if (this.cardPost.photo === null) {
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
    console.log('antes de navegar pra roxima pagin');
    console.log(this.cardPost.user_id);
    this.router.navigate(['/card-info', {
      id_user: this.cardPost.user_id,
      id: this.cardPost.id,
      mensagen: 'chegou mensagem'
    }]);
  }

}

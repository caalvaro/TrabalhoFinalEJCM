import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommentCreationPage } from '../../pages/comment-creation/comment-creation.page';
import { PostsService } from '../../service/posts.service';

@Component({
  selector: 'app-posts-cards',
  templateUrl: './posts-cards.component.html',
  styleUrls: ['./posts-cards.component.scss'],
})
export class PostsCardsComponent implements OnInit {

  @Input() cardPost;

  id: number;
  name = 'User';
  defaultImage = '../../assets/default_image/post.jpg ';
  defaultUser = '../../assets/default_image/user.jpg ';
  postTitle = 'Titulo Default';
  mainText = 'loanosicnasnckansklcnaslckascascascasccascasca scsCAS ASC G ZSG DG DF TXHSRTHTRSHTRHSRTHBSRTHNSRTHSRTHasc';

  constructor(
    private modalControler: ModalController,
    private postService: PostsService
    ) {
      // conseguir pegar o id do card quando crio ele
     }

  ngOnInit() {

  }
  

  async showModalComent() {
    const modal = await this.modalControler.create({
      component: CommentCreationPage
    });

    modal.present();
  }

  // trocar as informacoes de imagem para texto
  public change() {
    // se ele for verdadeiro gera isso
    // if( se tem imagem content){ return true ;}
  }

  // funcao para redirecionar pagina que da mais info sobre o user
  public userInfo() {
  }

  // funcao fz eu dar like no post
  public like() {
  }

  // funcao faz eu ver opcaoes de edicao do post
  public edit() {
  }

  // post info
  public postInfo() {
    console.log('troca');
  }

}

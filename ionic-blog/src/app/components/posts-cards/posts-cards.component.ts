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

  // pegar todos os posts e mostrar no blog

  @Input() cardPost;

  name = 'User';
  defaultImage = '../../assets/default_image/post.jpg ';
  defaultUser = '../../assets/default_image/user.jpg ';
  postTitle = 'Titulo Default';
  mainText = 'Texto default';
  allPosts: number;

  constructor(
    private modalControler: ModalController,
    private postService: PostsService
    ) { }

  ngOnInit() { }

  getRandomId(total) {
    return Math.floor(Math.random() * total ) + 1;
  }

  async showModalComent() {
    const modal = await this.modalControler.create({
      component: CommentCreationPage
    });

    modal.present();
  }

  public getPost(id) {
    this.postService.getPost(id).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // conseguir mais informacao sobre o post
  public postInfo() {
    console.log('mais info');
  }

  // trocar as informacoes de imagem para texto
  public change() {
    // se ele for verdadeiro gera isso
    // if( se tem imagem content){ return true ;}
  }

  // funcao para redirecionar pagina que da mais info sobre o user
  public userInfo() {
    console.log( 'user tocado');
  }

  // funcao fz eu dar like no post
  public like() {
    console.log('Like foi feito');
  }

  // funcao faz eu ver opcaoes de edicao do post
  public edit() {
    console.log('botao de mais foi apertado');
  }

}

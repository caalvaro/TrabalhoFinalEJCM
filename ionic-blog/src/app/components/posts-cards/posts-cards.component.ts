import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { CommentCreationPage } from '../../pages/comment-creation/comment-creation.page';
import { PostsService } from '../../service/posts.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-posts-cards',
  templateUrl: './posts-cards.component.html',
  styleUrls: ['./posts-cards.component.scss'],
})
export class PostsCardsComponent implements OnInit {

  @Input() cardPost;
  id;
  name ;
  user: any = [];
  comment: any = [];
  postTitle = 'Titulo';

  constructor(
    private modalControler: ModalController,
    private postsService: PostsService,
    private router: Router,
    ) {
      // conseguir pegar o id do card quando crio ele

      // this.idUser = this.cardPost.id_user;
      // this.idPost = this.cardPost.id_post;

      // console.log(this.cardPost);

     }

  ngOnInit() {
    //console.log('mensagem')
    //console.log(this.cardPost);
    this.getUser();
    console.log(this.user);
    console.log('mensagem pos getuser');
    this.id = this.cardPost.id;
  }



  async showModalComent() {
    const modal = await this.modalControler.create({
      component: CommentCreationPage
    });

    modal.present();
  }

  // trocar as informacoes de imagem para texto
  public change() {
    if (this.cardPost.photo === null || this.cardPost.photo === undefined) {
      return true;
    } else {
      return false;
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
    console.log(this.cardPost);
    console.log(this.cardPost.user_id);
    console.log(this.cardPost.id);
    this.router.navigate(['/card-info', {
      id_user: this.cardPost.user_id,
      id: this.cardPost.id,
      mensagen: 'chegou mensagem'
    }]);
  }


  // adquirir info do usuario como imagem e nome
  public getUser() {
    this.postsService.getUser(this.cardPost.user_id).subscribe(
      (res) => {
        //console.log(res);
        this.user = res.data;
        console.log('pegando info de user em posts');
        console.log(this.user);
        if (this.user.photo === null) {
          this.user.photo = '../../assets/default_image/user.jpg';
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

}

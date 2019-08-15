import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CommentService } from '../../service/comment.service';
import { ModalController } from '@ionic/angular';
import { CommentCreationPage } from '../../pages/comment-creation/comment-creation.page';
import { PostsService } from '../../service/posts.service';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.page.html',
  styleUrls: ['./card-info.page.scss'],
})
export class CardInfoPage implements OnInit {

  id;
  idUser;
  mensage;
  post: any = [];
  user: any = [];

  comments: any = [];
  commentCards: any = [];
  size: number;
  private readonly offset = 5;
  private index = 0;

  constructor(
    private aRoute: ActivatedRoute,
    private route: Router,
    private commentService: CommentService,
    private modalControler: ModalController,
    private postsService: PostsService
    ) {

  }

  ngOnInit() {
    this.idUser = this.aRoute.snapshot.paramMap.get('id_user');
    this.id = this.aRoute.snapshot.paramMap.get('id');
    this.mensage = this.aRoute.snapshot.paramMap.get('mensagen');
    this.getPost();
    this.getComment();
    console.log('o comment eh');
    console.log(this.comments);
    console.log(this.id);
    this.commentCards = this.comments.slice(this.index, this.offset + this.index);
    this.index += this.offset;
    console.log('os comments card sao ');
    console.log(this.commentCards);
    console.log(this.mensage);
    this.getUser();

  }

  async showModalComent() {
    const modal = await this.modalControler.create({
      component: CommentCreationPage
    });

    modal.present();
  }



  public getComment() {
    this.commentService.postsComments(this.id).subscribe(
      (res) => {
        console.log(res);
        this.comments = res;
        console.log('mostrando o comments');
        console.log(this.comments);
        this.size = this.comments.length;
        console.log('o tamanho dos comments eh')
        console.log(this.size);

      },
      (error) => {
        console.log(error);
      }
    );
  }


  public close() {
    this.route.navigate(['/tabs/home']);
  }

  loadData(event) {
    const news = this.comments.slice(this.index, this.offset + this.index);
    this.index += this.offset;

    for (let i = 0; i <= news.length; i++) {
      this.commentCards.push(news[i]);
    }

    event.target.complete();

    if (this.commentCards.length === this.size) {
      event.target.disabled = true;
    }


  }

  // criar post
  public getPost() {
    this.postsService.getPost(this.id).subscribe(
      (res) => {
        this.post = res.data;
        console.log('opa pegou a info do post');
        console.log(this.post);
      },
      (error) => {
        console.log(error);
      }
    );

  }

  // mostrar caso tenha comments
  public commentsIf() {
    if(this.comments === null || this.comments === undefined) {
      return false;
    } else{ return true; }

  }

  // trocar imagem por texto
  public change() {
    if (this.post.photo === null) {
      return true;
    }
  }

  // adquirir info do usuario como imagem e nome
  public getUser() {
    this.postsService.getUser(this.id).subscribe(
      (res) => {
        console.log(res);
        this.user = res.data;
        console.log('pegando info de user');
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
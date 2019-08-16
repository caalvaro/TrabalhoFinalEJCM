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

  idPost;
  idUser;
  mensage;
  post: any = [];
  user: any = [];
  
  comments: any = [];
  commentCards: any = [];
  commentsSize: number;
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
    this.idPost = this.aRoute.snapshot.paramMap.get('id');
    this.mensage = this.aRoute.snapshot.paramMap.get('mensagen');
    this.getPost();
    this.getComment();
    this.getUser();
    // this.getPost();
    // this.getComment();
    // console.log('o comment eh');
    // console.log(this.comments);
    // console.log(this.idPost);
    if (this.commentsSize > this.offset) {
      this.commentCards = this.comments.slice(this.index, this.offset + this.index);
      this.index += this.offset;
    } else {
      this.commentCards = this.comments;
    }
    // console.log('os comments card sao ');
    // console.log(this.commentCards);
    // console.log(this.mensage);
    // this.getUser();
    // console.log('usuario');
    // console.log(this.user);
    // console.log('post');
    // console.log(this.post);

  }

  async showModalComent() {
    const modal = await this.modalControler.create({
      component: CommentCreationPage
    });

    modal.present();
  }



  public getComment() {
    this.commentService.postsComments(this.idPost).subscribe(
      (res) => {
        console.log(res);
        this.comments = res;
        console.log('mostrando o comments');
        console.log(this.comments);
        this.commentsSize = this.comments.length;
        console.log('o tamanho dos comments eh');
        console.log(this.commentsSize);

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

    if (this.commentCards.length === this.comments.length) {
      event.target.disabled = true;
    }


  }

  // criar post
  public getPost() {
    this.postsService.getPost(this.idPost).subscribe(
      (res) => {
        console.log('post service ');
        this.post = res.data;
        console.log(this.post);
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
    if (this.comments === null || this.comments === undefined) {
      return false;
    } else{ return true; }

  }

  // trocar imagem por texto
  public change() {
    if (this.post.photo === null) {
      return true;
    } else {
      return false;
    }
  }

  // adquirir info do usuario como imagem e nome
  public getUser() {
    this.postsService.getUser(this.idUser).subscribe(
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
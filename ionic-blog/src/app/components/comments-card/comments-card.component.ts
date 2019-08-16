import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../../service/comment.service';
import { PostsService } from '../../service/posts.service';


@Component({
  selector: 'app-comments-card',
  templateUrl: './comments-card.component.html',
  styleUrls: ['./comments-card.component.scss'],
})
export class CommentsCardComponent implements OnInit {

  @Input() commentInfo;

  user;
  numberLikes: number;
  idUser: number;
  idPost: number;
  defaultUser = '../../assets/default_image/user.jpg ';
  postTitle = 'Titulo Default';
  mainText = 'loanosicnasnckansklcnaslckascascascasccascasca scsCAS ASC G ZSG DG DF TXHSRTHTRSHTRHSRTHBSRTHNSRTHSRTHasc';

  constructor(
    private commentService: CommentService,
    private postsService: PostsService
    ) { }

  ngOnInit() {
    this.getUser();
   // this.showLikes();
    console.log('isso eh o commentInfo');
    console.log(this.commentInfo);
    console.log('comment user');
    console.log(this.user);
  }

  //ver quantos likes o comentario tem no momento 

  // public showLikes(){
  //   this.commentService.showLikes(this.commentInfo.post_id).subscribe(
  //     (res) => {
  //       console.log('numero de likes');
  //       console.log(res);
  //       this.numberLikes = res;
  //       if (this.numberLikes === null) {
  //         this.numberLikes = 0;
  //       }

  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  // funcao para redirecionar pagina que da mais info sobre o user
  public ifLike(){

  }

  // funcao fz eu dar like no post
  public like() {
    this.commentService.postLike(this.commentInfo.post_id).subscribe(
      (res) => {
        console.log(res);
      }
    );
    console.log('like');
  }

  // funcao faz eu ver opcaoes de edicao do post
  public edit() {
  }

  // funcao para redirecionar pagina que da mais info sobre o user
  public getUser() {
    // modificar
    this.postsService.getUser(this.commentInfo.user_id).subscribe(
      (res) => {
        console.log(res);
        this.user = res.data;
        console.log('pegando info de user do comment');
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

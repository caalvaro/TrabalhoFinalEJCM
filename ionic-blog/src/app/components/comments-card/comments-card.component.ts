import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../../service/comment.service';
import { PostsService } from '../../service/posts.service';


@Component({
  selector: 'app-comments-card',
  templateUrl: './comments-card.component.html',
  styleUrls: ['./comments-card.component.scss'],
})
export class CommentsCardComponent implements OnInit {

  @Input() post;

  idUser: number;
  idPost: number;
  commentUser;
  defaultUser = '../../assets/default_image/user.jpg ';
  postTitle = 'Titulo Default';
  mainText = 'loanosicnasnckansklcnaslckascascascasccascasca scsCAS ASC G ZSG DG DF TXHSRTHTRSHTRHSRTHBSRTHNSRTHSRTHasc';

  constructor(
    private commentService: CommentService,
    private postsService: PostsService
    ) { }

  ngOnInit() {
    this.getUser();
    console.log('isso eh o  post');
    console.log(this.post);
    console.log('comment user');
    console.log(this.commentUser);
  }


  // funcao para redirecionar pagina que da mais info sobre o user


  // funcao fz eu dar like no post
  public like() {

    this.commentService.postLike(this.post).subscribe(
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
    this.postsService.getUser(this.post.id).subscribe(
      (res) => {
        console.log(res);
        this.commentUser.push(res);
        console.log('pegando info de user do comment');
        console.log(this.commentUser);
        if (this.commentUser.photo === null) {
          this.commentUser.photo = '../../assets/default_image/user.jpg';
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CommentService } from '../../service/comment.service';
import { ModalController } from '@ionic/angular';
import { CommentCreationPage } from '../../pages/comment-creation/comment-creation.page';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.page.html',
  styleUrls: ['./card-info.page.scss'],
})
export class CardInfoPage implements OnInit {

  foo = 'mensagem';
  sub;
  id;
  mensage;
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
    ) {
    this.id = this.aRoute.snapshot.paramMap.get('id_user');
    this.mensage = this.aRoute.snapshot.paramMap.get('mensage');
    this.commentCards = this.comments.slice(this.index, this.offset + this.index);
    this.index += this.offset;
    console.log(this.mensage);

  }

  ngOnInit() {
    this.commentConstruct(this.comments);

  }

  async showModalComent() {
    const modal = await this.modalControler.create({
      component: CommentCreationPage
    });

    modal.present();
  }



  commentConstruct(comments) {
    this.commentService.getAllComment(this.id).subscribe(
      (res) => {
        console.log(res);
        comments.push(res);
        this.size = comments.length;
      },
      (error) => {
        console.log();
      }

    );
  }


  public close(){
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



}

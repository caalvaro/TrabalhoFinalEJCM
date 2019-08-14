import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments-card',
  templateUrl: './comments-card.component.html',
  styleUrls: ['./comments-card.component.scss'],
})
export class CommentsCardComponent implements OnInit {

  idUser: number;
  idPost: number;
  image: string;
  userName: string;
  userTitle: string;
  text: string;
  name = 'User';
  defaultUser = '../../assets/default_image/user.jpg ';
  postTitle = 'Titulo Default';
  mainText = 'loanosicnasnckansklcnaslckascascascasccascasca scsCAS ASC G ZSG DG DF TXHSRTHTRSHTRHSRTHBSRTHNSRTHSRTHasc';

  constructor() { }

  ngOnInit() {}


  // funcao para redirecionar pagina que da mais info sobre o user
  public userInfo() {
    // this.router.navigate(['/user-info', {id_user: this.idUser}]);
  }

  // funcao fz eu dar like no post
  public like() {
  }

  // funcao faz eu ver opcaoes de edicao do post
  public edit() {
  }


}

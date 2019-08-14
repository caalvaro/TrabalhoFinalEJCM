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

}

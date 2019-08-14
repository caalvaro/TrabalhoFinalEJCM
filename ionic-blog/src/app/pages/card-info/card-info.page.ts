import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

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

  constructor(private aRoute: ActivatedRoute, private route: Router) {
    this.id = this.aRoute.snapshot.paramMap.get('id_user');
    this.mensage = this.aRoute.snapshot.paramMap.get('mensage');
    console.log(this.mensage);

  }

  ngOnInit() {
  }

  public close(){
    this.route.navigate(['/tabs/home']);
  }

}

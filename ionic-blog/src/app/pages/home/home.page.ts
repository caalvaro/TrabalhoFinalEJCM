import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../service/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
//precisamos importar a service aqui dentro para conseguirmos fazer as requizicoes
//das informacoes que vao para o card 
export class HomePage implements OnInit {

  posts = [];

  constructor() { }

  ngOnInit() {
  }




}

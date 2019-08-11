import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts-cards',
  templateUrl: './posts-cards.component.html',
  styleUrls: ['./posts-cards.component.scss'],
})
export class PostsCardsComponent implements OnInit {

  name = 'User';
  post_image = 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y';
  avatar_image = 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y';

  post_title = 'Titulo super interessante';

  constructor() { }

  ngOnInit() {}

}

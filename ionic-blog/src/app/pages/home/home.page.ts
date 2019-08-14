import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../service/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
// precisamos importar a service aqui dentro para conseguirmos fazer as requizicoes
// das informacoes que vao para o card
export class HomePage implements OnInit {

  posts: any = [];
  postPage: any = [];
  size: number;
  private readonly offset = 5;
  private index = 0;

  constructor(private postService: PostsService) {
    // this.posts = postConstruct();
    this.postPage = this.posts.slice(this.index, this.offset + this.index);
    this.index += this.offset;
  }

  ngOnInit() {
    this.postConstruct(this.posts);
    console.log(this.size + ' este eh o tamanho');
  }

  postConstruct(posts) {
    this.postService.getAllPosts().subscribe(
      (res) => {
        console.log(res);
        posts.push(res);
        this.size = posts.length;
      },
      (error) => {
        console.log();
      }

    );
  }

  loadData(event){
    const news = this.posts.slice(this.index, this.offset + this.index);
    this.index += this.offset;

    for(let i = 0 ; i <= news.length; i++){
      this.postPage.push(news[i]);
    }

    event.target.complete();

    if ( this.postPage.length === this.size) {
         event.target.disabled = true;
    }


  }


}

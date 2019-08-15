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
    this.postConstruct();
    console.log(this.size);
    console.log(this.posts);
    // this.posts = this.postConstruct(this.posts);
    this.postPage = this.posts.slice(this.index, this.offset + this.index);
    console.log(this.postPage);
    this.index += this.offset;
  }

  ngOnInit() {
  }

  public postConstruct() {
    this.postService.getAllPosts().subscribe(
      (res) => {
        console.log(res);
        this.posts.push(res);
        console.log(this.posts);
        this.size = res.length;
        console.log(this.size);
      },
      (error) => {
        console.log(error);
      }
      
    );
  }

  loadData(event) {
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

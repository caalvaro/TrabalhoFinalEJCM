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
  private readonly offset = 5;
  private index = 0;

  constructor(private postService: PostsService) {
    // this.posts = postConstruct();
    this.postPage = this.posts.slice(this.index, this.offset + this.index);
    this.index += this.offset;
  }

  ngOnInit() {
  }

  postConstruct(id) {
    this.postService.getPost(id).subscribe(
      (res) => {
        console.log(res);
        this.posts.push(res);
      },
      (error) => {
        console.log();
      }

    );
  }

  loadData(event){
    let news = this.posts.slice(this.index, this.offset + this.index);
    this.index += this.offset;

    for(let i = 0 ; i<= news.length;i++){
      this.postPage.push(news[i]);
    }

    event.target.complete();


    // caso ele seja maior que todos os itens dentro da lista ele tem que parar
    // if(this.postPage.length == ){
          event.target.disabled = true;
    // }


  }


}

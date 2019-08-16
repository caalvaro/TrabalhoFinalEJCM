import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../service/posts.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

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

  //informações do usuario logado
  infoUsuario = {
    isBlogger: 0,
    photo: null
  }

  constructor(private postService: PostsService, private authService: AuthService, private router: Router) {
  }

  ionViewDidEnter () {
    if (localStorage.getItem('userToken') != null) {
      this.authService.getInfoUsuario().subscribe(
        (res) => {
          console.log(res);
          this.infoUsuario = res.success;
          if (res.success.photo == null) {
            this.infoUsuario.photo = '..\\..\\..\\assets\\icon\\user.png';
          }
          console.log(this.infoUsuario);
        }
      );
    }
  }

  ngOnInit() {
    this.postConstruct();
    //console.log(this.posts.lenght);
    if (this.size >= 5) {
      this.postPage = this.posts.slice(this.index, this.offset + this.index);
      this.index += this.offset;
    }
    //console.log(this.size);
  }

  public postConstruct() {
   this.postService.getAllPosts().subscribe(
      (res) => {
        this.posts = res;
        //console.log(this.posts);

      },
      (error) => {
        //console.log(error);
      }
    );
  }
  loadData(event) {
    setTimeout(() => {
      //console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.posts === this.size) {
        event.target.disabled = true;
      }
    }, 500);
  }

  public getPost(id) {
    this.postService.getPost(id).subscribe(
      (res) => {
        //console.log(res);
      },
      (error) => {
        //console.log(error);
      }
    );


  }

  navigatePostar() {
    this.router.navigate(['/posting']);
  }
}

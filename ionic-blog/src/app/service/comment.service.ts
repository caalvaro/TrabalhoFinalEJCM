import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  backendURL = 'http://localhost:8000/api/';

  httpHeaders = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer '
    }
  }

  constructor(public http: HttpClient) { }

  // get all comments  
  public getAllComment() {
  }

  // encontrar um comentario
  public findComment(){
  }

  // comentarios do proprio usuario
  public userComments(){
  }

  // os comments de um serto post
  public postFromComments(){
  }

  // mostrar os likes de um comment
  public showLikes(){
  }

  // postar comentario
  public postComments(form , id): Observable<any> {
     return this.http.post(this.backendURL + 'createComment/' + id, form, this.httpHeaders);
  }
}

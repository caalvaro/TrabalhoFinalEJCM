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
  public getAllComment(id): Observable<any> {
    return this.http.get(this.backendURL + '/postComments' + id);
  }

  // encontrar um comentario
  public findComment(id): Observable<any> {
    return this.http.get(this.backendURL + 'findComment/' + id );
  }

  // comentarios do proprio usuario
  // public userComments(): Observable<any>{
  //   return this.http.get()
  // }

  // os comments de um serto post
  public postsComments(id): Observable<any> {
    return this.http.get(this.backendURL + 'postComments/' + id);
  }

  // mostrar os likes de um comment
  public showLikes(id): Observable<any> {
    return this.http.get(this.backendURL + 'showLikes/' + id);
  }

  // postar comentario
  public postComments(form , id): Observable<any> {
    this.httpHeaders.headers["Authorization"] = "Bearer " + localStorage.getItem('userToken');
    return this.http.post(this.backendURL + 'createComment/' + id, form, this.httpHeaders);
  }

  // dar like no comentario
  public postLike(id): Observable<any> {
    this.httpHeaders.headers["Authorization"] = "Bearer " + localStorage.getItem('userToken');
    return this.http.get(this.backendURL + 'likeComment/', this.httpHeaders);
  }

}

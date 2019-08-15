import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  backendURL = 'http://localhost:8000/api/';

  // Headers do programa
  httpHeaders = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer '
    }
  }

  constructor( public http: HttpClient ) { }

  public getAllPosts(): Observable<any> {
    return this.http.get(this.backendURL + 'allPost');
  }

  public getPost(id): Observable<any> {
    return this.http.get(this.backendURL + 'findPost/' + id);
  }

  public postPosts( post ): Observable<any> {
    this.httpHeaders.headers.Authorization = 'Bearer ' + localStorage.getItem('userToken');
    
    return this.http.post( this.backendURL + 'createPost/', {
      content: post.content,
      'photo': post.photo,
    }, this.httpHeaders);
  }

}

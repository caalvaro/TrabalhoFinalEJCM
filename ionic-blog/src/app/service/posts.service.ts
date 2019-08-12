import { Injectable } from '@angular/core';
import { HttpClient } from  "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  backendURL : string = 'http://localhost:8000/api/';

  // Headers do programa
  httpHeaders = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer '
    }
  }

  constructor( public http: HttpClient ) { }

  public getPosts():Observable<any>{

    return this.http.get(this.backendURL + 'get');
    
  }

  public postPosts( post ):Observable<any> {
    this.httpHeaders.headers["Authorization"] = "Bearer " + localStorage.getItem('userToken');
    console.log({
      'entrou': 'na service',
      'content': post.content,
      'photo': post.photo,
    });
    console.log(this.httpHeaders.headers);
    return this.http.post( this.backendURL + 'createPost/', {
      'content': post.content,
      'photo': post.photo,
    }, this.httpHeaders);
  }

}

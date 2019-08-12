import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  backendURL = 'http://localhost:8000/api/';

  constructor( public http: HttpClient ) { }

  public getAllPosts(): Observable<any> {
    return this.http.get(this.backendURL + 'allPost');
  }

  public getPost(id): Observable<any> {
    return this.http.get(this.backendURL + 'findPost/' + id);
  }

  public postPosts(post): Observable<any> {

    return this.http.post(this.backendURL + 'createPost', post);
  }

}

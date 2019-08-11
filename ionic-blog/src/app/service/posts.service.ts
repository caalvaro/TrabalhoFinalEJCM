import { Injectable } from '@angular/core';
import { HttpClient } from  "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  backendURL : string = 'http://localhost:8000/api/';

  constructor( public http: HttpClient ) { }

  public getPosts():Observable<any>{

    return this.http.get(this.backendURL + 'get');
    
  }

  // public postPosts(id):Observable<any>{
    
  //     return this.http.post( this.backendURL + 'post/' + id);
  // }

}

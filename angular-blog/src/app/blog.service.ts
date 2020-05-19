import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor() { }
  fetchPosts(username: string): void {//Promise<Post[]>{
  	fetch("localhost:3000/api/${username}")
  	.then(res => console.log(res););
  }
}
export class Post {
  postid: number;
  created: Date;
  modified: Date;
  title: string;
  body: string;
}


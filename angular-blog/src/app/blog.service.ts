import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor() { }

  fetchPosts(username: string): Promise<Post[]>{
    const url = `http://localhost:3000/api/${username}`;
    return fetch(url, {credentials: 'include'}).then(response => {
        let posts = response.json();
        console.log("Blog-Service - posts:")
        console.log(posts);
        return posts
        // as Post[]
    })
  }
  
}
export class Post {
  postid: number;
  created: Date;
  modified: Date;
  title: string;
  body: string;
}


import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor() { }
  // This method sends an HTTP GET request to /api/:username and retrieves all blog posts by the user.
  // If successful, the returned promise resolves to a Post array (of Post[] type) that contains the user’s posts.
  // In case of error, the promise is rejected to Error(response_status_code).
  fetchPosts(username: string): Promise<Post[]>{
    const url = `/api/${username}`;
    return fetch(url).then(response => {
      if(response.ok){
        let posts = response.json();
        // console.log("Blog-Service - posts:")
        // console.log(posts);
        return posts;
      }
      else{
        throw new Error(String(response.status));
      }
  }).catch(error => { Promise.reject(error).then(function()
      {//resoleved
      }, function(error){console.error(error);})})
  // .catch(error => { console.log(error)})
  }

}
export class Post {
  postid: number;
  created: Date;
  modified: Date;
  title: string;
  body: string;
}


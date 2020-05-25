import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  draft: Post;
  isNewDraft: boolean;
  callback = null;

  constructor() {
      this.draft = null;
  }
  // This method sends an HTTP GET request to /api/:username and retrieves all blog posts by the user.
  // If successful, the returned promise resolves to a Post array (of Post[] type) that contains the user’s posts.
  // In case of error, the promise is rejected to Error(response_status_code).
  fetchPosts(username: string): Promise<Post[]>{
    const url = `/api/${username}`;
    return fetch(url)
    .then(response => {
      if(!response.ok){
        throw new Error(String(response.status));
      }
      let posts = response.json();
      //console.log("Blog-Service - posts:");
      //console.log(posts);
      //return posts;
      //this.posts = posts;
      return posts;
    })
    .catch(error => {
      Promise.reject(error)
      .then(function(){//resoleved
      }, function(error){console.error(error);})});
      // .catch(error => { console.log(error)})
  }

  getPost(username: string, postid: number): Promise<Post>{
    const url = `/api/${username}/${postid}`;
    return fetch(url)
    .then(response => {
      if(!response.ok){
        throw new Error(String(response.status));
      }
      let post = response.json();
      //console.log("Blog-Service - posts:");
      //console.log(post);
      return post;})
    .catch(error => {
      Promise.reject(error)
      .then(function(){//resoleved
      }, function(error){console.error(error);})});
      // .catch(error => { console.log(error)})
  }

  newPost(username: string, post: Post): Promise<void> {
    const url = `/api/${username}/${post.postid}`;
    //console.log("post body");
    //console.log(JSON.stringify(post));
    let data = {
        title: post.title,
        body: post.body};
    //console.log(JSON.stringify(data));
    return fetch(url, {method: 'POST', headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify(data),})
    .then(response => {
      if(!response.ok){
        throw new Error(String(response.status));
      }
      })
    .catch(error => {
      Promise.reject(error)
      .then(function(){//resoleved
      }, function(error){console.error(error);})});
      // .catch(error => { console.log(error)})
  }
  updatePost(username: string, post: Post): Promise<void> {
    const url = `/api/${username}/${post.postid}`;
    //console.log("post body");
    //console.log(JSON.stringify(post));
    return fetch(url, {method: 'PUT', headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify(post),})
    .then(response => {
      if(!response.ok){
        throw new Error(String(response.status));
      }
      })
    .catch(error => {
      Promise.reject(error)
      .then(function(){//resoleved
      }, function(error){console.error(error);})});
      // .catch(error => { console.log(error)})
  }
  deletePost(username: string, postid: number): Promise<void> {
    const url = `/api/${username}/${postid}`;
    //console.log("post body");
    //console.log(JSON.stringify(post));
    return fetch(url, {method: 'DELETE',})
    .then(response => {
      if(!response.ok){
        throw new Error(String(response.status));
      }
    })
    .catch(error => {
      Promise.reject(error)
      .then(function(){//resoleved
      }, function(error){console.error(error);})});
      // .catch(error => { console.log(error)})
  }
  setCurrentDraft(post: Post): void {
    this.draft = post;

  }
  // This method returns the draft saved in the earlier setCurrentDraft() call
  // Return null if setCurrentDraft has never been called before.
  getCurrentDraft(): Post {
    return this.draft;
  }
  sendUpdate(username) {
    //this.callback(this.fetchPosts(username));
    this.fetchPosts(username)
    .then((posts)=>{this.callback(posts)});

  }
  subscribe(callback) { this.callback = callback; }

  setIsNewDraft(value){
    this.isNewDraft = value;
  }

  getIsNewDraft(){
    return this.isNewDraft;
  }


}
export class Post {
  postid: number;
  created: Date;
  modified: Date;
  title: string;
  body: string;
}


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
  fetchPosts(username: string): Promise<Post[]>{
    const url = `/api/${username}`;
    // If successful, the returned promise resolves to a Post array (of Post[] type) that contains the user’s posts.
    return fetch(url)
    .then(response => {
      if(!response.ok){
        throw new Error(String(response.status));
      }
      let posts = response.json();
      return posts;
    })
    .catch(error => {  // In case of error, the promise is rejected to Error(response_status_code).
      Promise.reject(error)
      .then(function(){//resoleved
      }, function(error){console.error(error);})});
      // .catch(error => { console.log(error)})
  }
  //This method sends an HTTP GET request to /api/:username/:postid and retrieves the particular post.
  getPost(username: string, postid: number): Promise<Post>{
    const url = `/api/${username}/${postid}`;
    // If successful, the returned promise resolves to a Post that corresponds to the retrieved post. In case of error, the promise is rejected to Error(status_code).
    return fetch(url)
    .then(response => {
      if(!response.ok){
        throw new Error(String(response.status));
      }
      let post = response.json();
      return post;})
    .catch(error => {
      Promise.reject(error)
      .then(function(){//resoleved
      }, function(error){console.error(error);})});
      // .catch(error => { console.log(error)})
  }

  // This method sends an HTTP POST request to /api/:username/:postid to save the new post in the server.
  newPost(username: string, post: Post): Promise<void> {
    const url = `/api/${username}/${post.postid}`;
    let data = {title: post.title, body: post.body};
    return fetch(url, {method: 'POST', headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify(data),})
    .then(response => {
      if(!response.ok){
        throw new Error(String(response.status));
      }
      })
    .catch(error => {//In case of error, the promise is rejected to Error(status_code).
      Promise.reject(error)
      .then(function(){//resoleved
      }, function(error){console.error(error);})});
      // .catch(error => { console.log(error)})
  }
  //This method sends an HTTP PUT request to /api/:username/:postid to update the corresponding post in the server.
  updatePost(username: string, post: Post): Promise<void> {
    const url = `/api/${username}/${post.postid}`;
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
  // This method sends an HTTP DELETE request to /api/:username/:postid to delete the corresponding post from the server.
  deletePost(username: string, postid: number): Promise<void> {
    const url = `/api/${username}/${postid}`;
    return fetch(url, {method: 'DELETE'})
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
  //This method “saves” the post as the current “draft”, so that it can be returned later when getCurrentDraft() is called.
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


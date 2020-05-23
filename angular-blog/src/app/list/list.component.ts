import { Component, OnInit } from '@angular/core';
import { Post, BlogService } from '../blog.service';
import { ActivatedRoute, Router } from '@angular/router';

import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  posts:Post[];
  nextID: number;
  username: string;
  // posts = this.blogService.fetchPosts(this.username);

  constructor(private blogService: BlogService, 
              private router: Router,
              private activatedRoute: ActivatedRoute) {
      // console.log(parseJWT(document.cookie).usr);
      // this.blogService.fetchPosts(this.username)
      // .then(posts => {
      //     console.log("posts:" + posts);
      //     this.posts = posts;    });
      // console.log("posts" + this.posts);
  }

  ngOnInit(): void {
    // this.posts =

    //if(document.cookie){
    //  let username = parseJWT(document.cookie).usr;
    this.username = this.getUsername();
    //this.getPosts();
    this.activatedRoute.paramMap.subscribe(() => {
      this.getPosts();
    });
    //this.blogService.getPosts(this.username).then((post)=>this.posts = post);

    

      /* not work
      this.posts=this.blogService.fetchPosts(username)
      .then(posts => {
        this.posts = [];
        this.posts = posts;
      });
      console.log(this.posts);
      */
      // username = "errorTrigger"; //for bug triggering
      
      

      /*
      this.blogService.getPost(username,1).then(post => {
        this.posts = [];
        this.posts[0] = post;
      });*/
      /*
      let tempPost_new:Post = { "postid": 3, "created": new Date(), "modified": new Date(), "title": "## Title 3", "body": "I am here." };
      let tempPost_put1:Post = { "postid": 3, "created": new Date(), "modified": new Date(), "title": "## Title 3", "body": "I am here." };
      let tempPost_put2:Post = { "postid": 3, "created": new Date(), "modified": new Date(), "title": "## Title 3", "body": "I am here._hello" };
      */
      //this.blogService.newPost(username, tempPost_new);
      //this.blogService.updatePost(username, tempPost_put1);
      //this.blogService.deletePost(username, 3);
      //console.log(JSON.stringify(this.blogService.getCurrentDraft()));
      //this.blogService.setCurrentDraft(tempPost_put2);
      //console.log(JSON.stringify(this.blogService.getCurrentDraft()));


    //}
    //else{
    //    console.log("TODO: no cookie is found!");
    //}
    // console.log("ListComponent - posts")
    // console.log(this.posts);
  }
  getUsername() {
    let username = "";
    if(document.cookie){
      username = parseJWT(document.cookie).usr;
    }
    else{
        console.log("TODO: no cookie is found!");
    }
    return username;
  }
  getPosts() {
    this.blogService.fetchPosts(this.username)
    .then(posts => {
       this.posts = [];
       this.posts=posts;
       //console.log(this.posts);
    });
  }
  getNextID() {
    let maxID = 0;
    for(let i = 0; i < this.posts.length; i++){
      if(this.posts[i].postid > maxID)
        maxID = this.posts[i].postid;
    }
    this.nextID = maxID+1;
  }
  newPost(){
    this.getNextID();
    //console.log(this.nextID);
    let tempPost_new:Post = { "postid": this.nextID, "created": new Date(), "modified": new Date(), "title": "", "body": "" };
    this.blogService.newPost(this.username, tempPost_new);
    this.blogService.setCurrentDraft(tempPost_new);
    this.getPosts();
    this.router.navigate(['/edit/' +this.nextID]);

  }
  curPost(post){
    this.blogService.setCurrentDraft(post);
    //console.log(post.postid)
    this.router.navigate(['/edit/'+post.postid]);
  }


  //for testing
  //showAlert() { alert("Submit button pressed!"); return false; }
  

}

//the JWT token is accessible through document.cookie
//parseJWT extracts the username from JWT
function parseJWT(token)
{
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
}
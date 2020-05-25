import { Component, OnInit } from '@angular/core';
import { Post, BlogService } from '../blog.service';
import { ActivatedRoute, Router } from '@angular/router';

import { ThrowStmt } from '@angular/compiler';

// //For @Input()
// import { Input } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  // //Decorate a property with @Input() to expose it to property binding
  // @Input() posts:Post[];
  posts:Post[];

  nextID: number;
  username: string;

  // posts = this.blogService.fetchPosts(this.username);

  constructor(private blogService: BlogService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    blogService.subscribe((posts) => { this.posts = posts; });
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
    // this.getPosts();
    this.activatedRoute.paramMap.subscribe(() => this.getPosts());
    // this.router.paramMap.subscribe(() => this.getPosts());

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
       //clear posts
       this.posts = [];
       this.posts = posts;
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
  //called when new post button is clicked
  newPost(){
    this.getNextID();
    //console.log(this.nextID);
    let tempPost_new:Post = { "postid": this.nextID, "created": new Date(), "modified": new Date(), "title": "", "body": "" };
    this.blogService.newPost(this.username, tempPost_new);
    this.blogService.setCurrentDraft(tempPost_new);
    this.getPosts();
    this.router.navigate(['/edit/' +this.nextID]);

  }

  saveCurrPostAsDraft(post){
    this.blogService.setCurrentDraft(post);
    this.router.navigate(['/edit/' +post.postid]);
  }
/*
  setUpdate(posts){
    console.log("I am here");
    console.log(posts);
    this.posts=posts;
  }
  */
  //for testing
  //showAlert() { alert("Submit button pressed!"); return false; }


}

//the JWT token is accessible through document.cookie
//parseJWT extracts the username from JWT
function parseJWT(cookie)
{
    //get jwt from cookie
    //example cookie
    //PHPSESSID=oa5e8o9kik3489ofj35g13acf2; _ga=GA1.1.1138388568.1590315667; _gid=GA1.1.1710354031.1590315667; jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTAzNTIyNzgsInVzciI6ImNzMTQ0I
    //reference: https://stackoverflow.com/questions/10730362/get-cookie-by-name
    const value = `; ${cookie}`;
    const parts = value.split(`; jwt=`);
    let token;
    if (parts.length === 2){
        token = parts.pop().split(';').shift();
    }
    else{
        token = cookie;
    }
    //given by spec
    let jwt = token.split('; ')
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
}
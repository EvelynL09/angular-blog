import { Component, OnInit } from '@angular/core';
import { Post, BlogService } from '../blog.service';
import { Router } from '@angular/router';

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

  constructor(private blogService: BlogService,
              private router: Router) {
    //subscribe posts update from blog service
    blogService.subscribe((posts) => { this.posts = posts; });
  }

  ngOnInit(): void {
    this.username = this.getUsername();
    this.getPosts();
  }

  //get user name from cookie
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
  //
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
    this.blogService.setIsNewDraft(true);
    // create a new empty post whose postid is +1 of the maximum postids of the user
    this.getNextID();
    let tempPost_new:Post = { "postid": this.nextID, "created": new Date(), "modified": new Date(), "title": "", "body": "" };
    //sets it as the current draft by calling setCurrentDraft()
    this.blogService.setCurrentDraft(tempPost_new);
    // open the “edit view” on the right side.
    this.router.navigate(['/edit/' +this.nextID]);
  }

  //called when a post is clicked
  currPost(post){
    //old post
    this.blogService.setIsNewDraft(false);
    // it sets the clicked post as the “current draft” by calling setCurrentDraft(post) of BlogService
    this.blogService.setCurrentDraft(post);
    // open the “edit view” on the right side.
    this.router.navigate(['/edit/' +post.postid]);
  }
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
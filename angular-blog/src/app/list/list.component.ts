import { Component, OnInit } from '@angular/core';
import { Post, BlogService } from '../blog.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  posts:Post[];
  // posts = this.blogService.fetchPosts(this.username);

  constructor(private blogService: BlogService) {
      // console.log(parseJWT(document.cookie).usr);
      // this.blogService.fetchPosts(this.username)
      // .then(posts => {
      //     console.log("posts:" + posts);
      //     this.posts = posts;    });
      // console.log("posts" + this.posts);
  }

  ngOnInit(): void {
    // this.posts =
    if(document.cookie){
      let username = parseJWT(document.cookie).usr;
      // username = "errorTrigger"; //for bug triggering

      /*
      this.blogService.fetchPosts(username).then(posts => {
        this.posts = [];
        this.posts = posts;
      });
      */

      /*
      this.blogService.getPost(username,1).then(post => {
        this.posts = [];
        this.posts[0] = post;
      });*/
      let tempPost_new:Post = { "postid": 3, "created": new Date(), "modified": new Date(), "title": "## Title 3", "body": "I am here." };
      let tempPost_put1:Post = { "postid": 3, "created": new Date(), "modified": new Date(), "title": "## Title 3", "body": "I am here." };
      let tempPost_put2:Post = { "postid": 3, "created": new Date(), "modified": new Date(), "title": "## Title 3", "body": "I am here._hello" };

      //this.blogService.newPost(username, tempPost_new);
      //this.blogService.updatePost(username, tempPost_put1);
      //this.blogService.deletePost(username, 3);
      console.log(JSON.stringify(this.blogService.getCurrentDraft()));
      this.blogService.setCurrentDraft(tempPost_put2);
      console.log(JSON.stringify(this.blogService.getCurrentDraft()));


    }
    else{
        console.log("TODO: no cookie is found!");
    }
    // console.log("ListComponent - posts")
    // console.log(this.posts);
  }
  

}

//the JWT token is accessible through document.cookie
//parseJWT extracts the username from JWT
function parseJWT(token)
{
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
}
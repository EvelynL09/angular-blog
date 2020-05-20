import { Component, OnInit } from '@angular/core';
import { Post, BlogService } from '../blog.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

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
    this.blogService.fetchPosts(this.username).then(posts => this.posts = posts);
    // console.log("ListComponent - posts")
    // console.log(this.posts);
  }
  posts:Post[];
  username = parseJWT(document.cookie).usr;
  // posts = this.blogService.fetchPosts(this.username);

}

//the JWT token is accessible through document.cookie
//parseJWT extracts the username from JWT
function parseJWT(token)
{
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
}
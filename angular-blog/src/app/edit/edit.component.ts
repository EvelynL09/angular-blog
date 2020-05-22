import { Component, OnInit } from '@angular/core';
import { Post, BlogService } from '../blog.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  	post:Post;

  	constructor(private blogService: BlogService,
  				private activatedRoute: ActivatedRoute) { }

  	ngOnInit(): void {
  		if(document.cookie){
      		let username = parseJWT(document.cookie).usr;
  			this.activatedRoute.paramMap.subscribe(() => this.getPost(username));
  		}
  	}
  	getPost(username) {
  		let postid=Number(this.activatedRoute.snapshot.paramMap.get('id'));
  		this.blogService.getPost(username, postid)
  		.then(post => {
      		this.post = post;
      		//this.blogService.setCurrentDraft(post.);
      	});
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
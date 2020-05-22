import { Component, OnInit } from '@angular/core';
import { Post, BlogService } from '../blog.service';
import { ActivatedRoute, Router } from '@angular/router';

import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  	post:Post;
  	username:string;
  	postid:number;

  	constructor(private blogService: BlogService,
  				private activatedRoute: ActivatedRoute,
  				private router: Router) { }

  	ngOnInit(): void {
  		this.username = this.getUsername();
  		this.postid = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  		this.activatedRoute.paramMap.subscribe(() => this.getPost());

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
  	getPost() {
  		this.post = this.blogService.getCurrentDraft();
  		/*let postid=Number(this.activatedRoute.snapshot.paramMap.get('id'));
  		this.blogService.getPost(this.username, postid)
  		.then(post => {
      		this.post = post;
      	});*/
  	}
  	/*save(){
  		this.blogService.updatePost();
  	}*/
  	delete(){
  		this.blogService.deletePost(this.username, this.postid);
  		this.router.navigate(['/']);
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
import { Component, OnInit } from '@angular/core';
import { Parser, HtmlRenderer } from 'commonmark';//import commonmark library
import { Post, BlogService } from '../blog.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  post:Post;
  postid:number;
  username:string;
  parser:Parser;
  render:HtmlRenderer;

  constructor(private blogService: BlogService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.parser = new Parser();
    this.render = new HtmlRenderer();
    this.username = parseJWT(document.cookie).usr;
  	this.activatedRoute.paramMap.subscribe(() => this.setPreview());
  }
  setPreview(){
    this.getPost();
    this.renderPost();
  }

  getPost() {
    this.postid = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    let currDraft:Post = this.blogService.getCurrentDraft();
    console.log(currDraft)
    if(currDraft == null){
      this.blogService.getPost(this.username, this.postid)
                            .then(post => {this.post = post;});
    }
    else if (currDraft.postid != this.postid){
      this.blogService.getPost(this.username, this.postid)
                                .then(post => {this.post = post;});
    }
    else{
      this.post = this.blogService.getCurrentDraft();
    }

  }

  renderPost(){
    console.log("hi");
	let parsedTitle = this.parser.parse(this.post.title);
	let curTitle = this.render.render(parsedTitle);
	let parsedBody = this.parser.parse(this.post.body);
	let curBody = this.render.render(parsedBody);

    this.post.title = curTitle;
    this.post.body = curBody;
  }

  //Edit button
  goToEdit(){
    this.router.navigate(['/edit/' + this.post.postid]);
  }
}

//the JWT token is accessible through document.cookie
//parseJWT extracts the username from JWT
function parseJWT(cookie)
{
    //get jwt from cookie
    //example cookie
    //PHPSESSID=oa5e8o9kik3489ofj35g13acf2; _ga=GA1.1.1138388568.1590315667; _gid=GA1.1.1710354031.1590315667; jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTAzNTIyNzgsInVzciI6ImNzMTQ0I
    //https://stackoverflow.com/questions/10730362/get-cookie-by-name
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
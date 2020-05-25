import { Component, OnInit } from '@angular/core';
import { Post, BlogService } from '../blog.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {
  //@Output() update = new EventEmitter<Post[]>();
  	post:Post;
  	username:string;
  	postid:number;
  // //Decorate a property with @Input() to expose it to property binding
  // @Input() posts:Post[];

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
  		this.postid = Number(this.activatedRoute.snapshot.paramMap.get('id'));
        let currDraft:Post = this.blogService.getCurrentDraft();
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
  		/*let postid=Number(this.activatedRoute.snapshot.paramMap.get('id'));
  		this.blogService.getPost(this.username, postid)
  		.then(post => {
      		this.post = post;
      	});*/
  	}
    //called when delete button is clicked
  	delete(){
  		this.blogService.deletePost(this.username, this.postid);
        //trigger posts list to update
        this.blogService.sendUpdate(this.username);
        //go back to main list page
  		this.router.navigate(['/']);
  	}
    //called when save button is clicked
  	save(){
        //this.post = this.blogService.getCurrentDraft();
        if(this.blogService.getIsNewDraft()){
            this.blogService.newPost(this.username, this.post).then(res => console.log(res));
            this.blogService.setIsNewDraft(false);
        }
        else{
  		    this.blogService.updatePost(this.username, this.post);
        }
        this.blogService.sendUpdate(this.username);
  	}
    //Called when the user clicks on the “preview” button in the EditComponent,
    preview(){
        //you should (locally) save the current (edited) draft by calling setCurrentDraft(post)
        // of BlogService (so that PreviewComponent) can obtain the (edited) draft) and 
        this.blogService.setCurrentDraft(this.post);
        //“navigate” to the URL preview/:id.
        this.router.navigate(['/preview/' + this.postid]);
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
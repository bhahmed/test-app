import { Component , OnDestroy} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Observable } from "rxjs/Observable";
import {Subscription} from 'rxjs';

import { Blog } from "./blog";
import { AppService } from "./app.service";
import { Note } from "./note";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  blog: Blog = new Blog();
  blogID: number;
  notes: Note[]=[];
  msg: string = "Invalid blogID, try again";
  isValid: boolean = true;
  blogSubs: Subscription;

  constructor(private appService: AppService) {}

  ngOnDestroy(): void {
    if(this.blogSubs)
    this.blogSubs.unsubscribe();
  }
 
  onClick(){

      this.blog=new Blog();
      if( (this.blogID<=10000) || (this.blogID>=10000000) || (this.blogID % 5 == 0) ){
          this.isValid=false;
      }else{
          
          this.isValid=true;
          this.blogSubs = this.appService.getBlogID(this.blogID)
                        .subscribe(bl=>{
                          this.blog=bl;
                          this.notes=this.blog.notes;
                        
                        });
      }

      
      
  
  }

  onDelete(noteID)
  {  
    this.blogSubs = this.appService.deleteNote(noteID)
                        .subscribe((ok)=>{
                          console.log(ok);
                          
                          this.appService.getBlogID(this.blogID)
                          .subscribe(bl=>{

                          this.blog=bl;
                          this.notes=this.blog.notes;
                        }); 
                        });   
  }
}


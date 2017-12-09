import { Injectable, OnDestroy } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs";
import { Note } from "./note";




@Injectable()
export class AppService  {  

   constructor(private _http: Http){}

    getBlogID(blogID): Observable<any>{
       
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        const proxyurl = "https://cors-anywhere.herokuapp.com/";

        let option = new RequestOptions();
        option.headers = headers;

        return this._http.get(proxyurl+"http://clubfreetst.herokuapp.com/blogs/"+blogID, option)
        .map(res=> {
           let blog : any =  res.json();
           return blog;
        });
       
    }


    deleteNote(noteID): Observable<any>{

        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        const proxyurl = "https://cors-anywhere.herokuapp.com/";

        let option = new RequestOptions();
        option.headers = headers;

        return this._http.delete(proxyurl+"http://clubfreetst.herokuapp.com/notes/"+noteID, option)
        .map(res=> {
           return res;
        });
    }
}
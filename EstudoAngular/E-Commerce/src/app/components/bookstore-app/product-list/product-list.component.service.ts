import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders } from "@angular/common/http";
import { book } from "./model/book";

@Injectable()
export class bookService{
    private url = 'http://localhost:4200/api/bookstore';
    HttpOptions={
        Headers: new HttpHeaders({'content-type': 'aplication/json'})
    }
    constructor(private htpp:HttpClient){}
    getBook(){
        return this.htpp.get(this.url)
    }
}
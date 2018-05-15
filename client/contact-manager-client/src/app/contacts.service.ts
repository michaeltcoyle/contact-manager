import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpHandler, HttpResponse} from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { map } from "rxjs/operators";
import {Contact} from "./contact.model";


export class LocalContact implements Contact {
    public _id: string;
    constructor (public firstName: string, public lastName: string,
        public phone: string, public email: string) {};
}

@Injectable()
export class ContactsService{

    constructor(private http: HttpClient) {}

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
    }

    apiUrl = 'http://localhost:3000/api/';

    getContacts(): any {
        return this.http.get(this.apiUrl+'contacts');
    }

    saveContact(): any {
        //var newContact = new LocalContact("tes2131t", "nameLa1231st","456-123-4567", "yahooaol@gmail.com");
        //return this.http.post(this.apiUrl+'contact', JSON.stringify(newContact), this.httpOptions);
    }
}
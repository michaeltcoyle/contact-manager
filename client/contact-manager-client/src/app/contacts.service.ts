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

    saveContact(firstName: string, lastName: string, phone: string, email: string): any {
        var newContact = new LocalContact(firstName, lastName, phone, email);
        return this.http.post(this.apiUrl+'contact', JSON.stringify(newContact), this.httpOptions);
    }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { map } from "rxjs/operators";
import { Contact } from './contact.model';
@Injectable()
export class ContactsService {

    constructor(private http: HttpClient) {}

    apiUrl = 'http://localhost:3000/api/contacts';
    getContacts(): any {
        return this.http.get(this.apiUrl);
    }
}
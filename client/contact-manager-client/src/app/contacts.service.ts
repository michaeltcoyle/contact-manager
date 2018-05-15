import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpHandler, HttpResponse} from '@angular/common/http';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { map } from "rxjs/operators";
import { Contact } from "./contact.model";


export class LocalContact implements Contact {
    public _id: string;
    constructor (public firstName: string, public lastName: string,
        public phone: string, public email: string) {};
}

@Injectable()
export class ContactsService{
    contacts = new BehaviorSubject<Contact[]>(new Array());
    currentContacts = this.contacts.asObservable();
    constructor(private http: HttpClient) {
        this.http.get(this.apiUrl+'contacts').subscribe(data => {
            this.contacts.next(data as Contact[]);
        });
    }

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
    }

    apiUrl = 'http://localhost:3000/api/';

    getContacts(): Observable<Contact[]> {
        return this.currentContacts;
    }

    private updateContacts(): Observable<Contact[]> {
        return this.http.get(this.apiUrl+'contacts') as Observable<Contact[]>;
    }

    saveContact(firstName: string, lastName: string, phone: string, email: string): any {
        var newContact = new LocalContact(firstName, lastName, phone, email);
        this.http.post(this.apiUrl+'contact', JSON.stringify(newContact), this.httpOptions)
        .subscribe(() => {
            this.updateContacts().subscribe(data => {
                this.contacts.next(data);
            })
        })
    }
}
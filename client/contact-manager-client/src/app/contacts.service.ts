import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpHandler, HttpResponse} from '@angular/common/http';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { map } from "rxjs/operators";
import { Contact } from "./contact.model";
import { Grid } from "ag-grid";
import { agRow } from "./agRow.model"


export class LocalContact implements Contact {
    public _id: string;
    constructor (public firstName: string, public lastName: string,
        public phone: string, public email: string) {};
}

@Injectable()
export class ContactsService{
    contacts = new BehaviorSubject<Contact[]>(new Array());
    private selectionRow: agRow;
    currentContacts = this.contacts.asObservable();
    myGrid: Grid;
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

    setSelectionRow(row: agRow) {
        this.selectionRow = row;
        console.log(row);
    }

    getSelectionRow() {
        return this.selectionRow;
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

    deleteContact() {
        this.http.delete(this.apiUrl+'contact/'+this.selectionRow.id)
        .subscribe(() => {
            this.updateContacts().subscribe(data => {
                this.contacts.next(data);
            })
        })
    }

    editContact(firstName: string, lastName: string, phone: string, email: string, id: string) {
        var updContact = {"firstName": firstName, "lastName": lastName, "phone": phone, "email": email};
        this.http.put(this.apiUrl+'contact/'+id, updContact)
        .subscribe(() => {
            this.updateContacts().subscribe(data => {
                this.contacts.next(data);
            })
        })
    }
}
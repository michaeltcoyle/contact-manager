import { Component, OnInit } from '@angular/core';
import { ContactsService } from './contacts.service';
import { Contact } from './contact.model';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    //Create Table Headers
    title = 'app';

    columnDefs = [
      {headerName: 'Name', field: 'name' },
      {headerName: 'Phone', field: 'phone' },
      {headerName: 'Email', field: 'email' }
    ];
    
    rowData: any[] = new Array<any>();
    //Get Contact Data
    contacts: Contact[] = new Array();
    constructor(private contactsService: ContactsService) {
      this.contactsService.getContacts().subscribe(data => {
      this.contacts = data;
      });
    }
    
    ngOnInit(){
      this.contacts.forEach(((entry: Contact, i: number) => {
          this.rowData[i] = new Array<any>();
          this.rowData[i].name = entry.firstName.concat(" ", entry.lastName);
          this.rowData[i].phone = entry.phone;
          this.rowData[i].email = entry.email;
          i = i + 1;
      }), this);
    }
  }
  


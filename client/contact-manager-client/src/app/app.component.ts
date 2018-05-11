import { Component, OnInit } from '@angular/core';
import { ContactsService } from './contacts.service';
import { Contact } from './contact.model';
import { HttpClient } from '@angular/common/http';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';


//Declare custom type for table Rows
type agRow = {name: string, phone: string, email: string};

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
  

  //Initialize Fields
  rowData: agRow[];
  contacts: Contact[] = new Array();


  //Get Contact Data
  constructor(private contactsService: ContactsService) {
    this.contactsService.getContacts().subscribe(data => {
    this.contacts = data;
    this.rowData = this.populateRows(this.contacts);
    });
  }

  //Populate Rows with Contacts
  populateRows(data: Contact[]): agRow[] {
    this.rowData = new Array<agRow>(data.length);
    var index: number = 0;
    var namefl: string;
    for(let contact of data){
      namefl = contact.firstName.concat(" ").concat(contact.lastName);
      this.rowData[index] = {name: namefl, phone: contact.phone, email: contact.email};
      index = index+1;
    }
    return this.rowData;
  }

  //Do on page initialization
  ngOnInit(){

  }
}
  


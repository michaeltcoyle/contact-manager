import { Input, Component, OnInit, ElementRef, Injectable } from '@angular/core';
import { ContactsService } from './contacts.service';
import { Contact } from './contact.model';
import { agRow } from './agRow.model';
import { HttpClient } from '@angular/common/http';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { FormsModule } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from "rxjs/operators";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


@Injectable()
export class AppComponent implements OnInit {


  //Create Table Headers
  title = 'app';

  columnDefs = [
    {headerName: 'Name', field: 'name' },
    {headerName: 'Phone', field: 'phone' },
    {headerName: 'Email', field: 'email' }
  ];

  //Initialize Fields
  contacts: Contact[];
  rowData: agRow[];

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

  //update rows
  updateContacts(){
    this.contactsService.getContacts().subscribe(data => {
      this.contacts = data;
      this.rowData = this.populateRows(this.contacts);
    });
  }

  //pass grid data
  getGridData(): agRow[] {
    return this.rowData;
  }

  //Do on page initialization
  ngOnInit(){
    
  }

}
  


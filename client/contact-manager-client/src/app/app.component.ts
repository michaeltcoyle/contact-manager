import { Input, Component, OnInit, ElementRef, Injectable } from '@angular/core';
import { ContactsService } from './contacts.service';
import { Contact } from './contact.model';
import { agRow } from './agRow.model';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from "rxjs/operators";
import { Grid, ColumnApi, GridApi, GridOptions} from "ag-grid";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{

  //Initialize Fields
  myGrid: Grid;
  selectedRow: agRow;
  title = 'app';
  //Create Table Headers

  gridOptions: GridOptions;

  // let the grid know which columns and what data to use

  public contacts: Contact[];
  //Get Contact Data
  constructor(private contactsService: ContactsService) {
    this.contacts = new Array<Contact>();
    
    this.contactsService.currentContacts.subscribe(data => {
      this.contacts = data;
    });
    console.log(this.contacts);
    this.gridOptions = <GridOptions>{
      columnDefs: [
        {headerName: 'Name', field: 'name', suppressMovable: true },
        {headerName: 'Phone', field: 'phone', suppressMovable: true  },
        {headerName: 'Email', field: 'email', suppressMovable: true  }
      ],
      rowHeight: 48,
      rowData: this.populateRows(this.contacts),
      onGridReady: () => {
        console.log(this.gridOptions.rowData);
      }
    }
  }

  //Populate Rows with Contacts
  populateRows(data: Contact[]): agRow[] {
    console.log(data);
    var rowData = new Array<agRow>(data.length);
    console.log(data.length);
    var index: number = 0;
    var namefl: string;
    for(let contact of data){
      namefl = contact.firstName.concat(" ").concat(contact.lastName);
      rowData[index] = {name: namefl, phone: contact.phone, email: contact.email};
      index = index+1;
      console.log(rowData);
    }
    console.log(rowData);
    return rowData as agRow[];
  }

  /*
  updateRowSelection(CellClickedEvent) {

  }*/

  

  //Do on page initialization
  ngOnInit(){

  }

}
  

